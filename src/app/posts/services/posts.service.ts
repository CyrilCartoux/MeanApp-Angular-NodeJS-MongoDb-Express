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
            imagePath: post.imagePath
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
    this.http.post<{ message: string, post: Post }>(this.url + 'api/posts', postData)
      .subscribe(res => {
        this.getPosts();
        // const newPost: Post = {
        //   id: res.post.id,
        //   title: post.title,
        //   content: post.content,
        //   imagePath: res.post.imagePath
        // };
        // this.posts.push(newPost);
        // this.postAdded.next([...this.posts]);
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

  editPost(id: string, post: Post, image: File | string) {
    let postData;
    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', image, post.title);
    } else {
      postData = {
        id: post.id,
        title: post.title,
        content: post.content,
        imagePath: image
      }
    }
    this.http.put<Post>(this.url + 'api/post/' + id, postData)
      .subscribe(result => {
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === postData.id);
        // const newPost: Post = {
        //   id: result.id,
        //   title: result.title,
        //   content: result.content,
        //   imagePath: result.imagePath
        // };

        // updatedPosts[oldPostIndex] = newPost;
        // this.posts = updatedPosts;
        this.getPosts();
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(this.url + 'api/post/' + id);
  }

}
