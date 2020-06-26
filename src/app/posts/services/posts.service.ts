import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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
    this.http.get<{ message: string, posts: Post[] }>(this.url + 'api/posts')
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postAdded.next([...this.posts]);
      });
  }

  addPost(post: Post) {
    this.http.post<{ message: string, posts: Post[] }>(this.url + 'api/posts', post)
      .subscribe(res => {
        console.log(res);
        this.posts.push(post);
        this.postAdded.next([...this.posts])
      });
  }

}
