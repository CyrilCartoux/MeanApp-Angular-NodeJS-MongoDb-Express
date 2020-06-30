import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postAdded = new Subject<Post[]>();
  posts: Post[] = [];
  url = 'http://localhost:3000/';
  constructor(
    private http: HttpClient
  ) { }

  getPosts() {
    this.http
      .get<{ message: string, posts: any }>(this.url + 'api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content,
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postAdded.next([...this.posts]);
      });
  }

  addPost(post: Post, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http.post<{ message: string, postId: string }>(this.url + 'api/posts', postData)
      .subscribe(res => {
        const newPost: Post = {
          id: res.postId,
          title: post.title,
          content: post.content,
        };
        this.posts.push(newPost);
        this.postAdded.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http.delete<Post>(this.url + 'api/post/' + id)
      .subscribe(res => {
        const updatedPosts = this.posts.filter(post => {
          return post.id !== id;
        });
        this.posts = updatedPosts;
        this.postAdded.next([...this.posts]);
      });
  }

  editPost(id: string, post: Post) {
    this.http.put<Post>(this.url + 'api/post/' + id, post)
      .subscribe(result => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postAdded.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>(this.url + 'api/post/' + id);
  }

}
