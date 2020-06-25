import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postAdded = new BehaviorSubject<Post[]>(null);
  posts: Post[] = [];

  constructor() { }

  addPost(post: Post) {
    this.posts.push(post);
    this.postAdded.next(this.posts);
  }

}
