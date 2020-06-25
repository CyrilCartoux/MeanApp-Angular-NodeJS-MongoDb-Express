import { PostsService } from './../services/posts.service';
import { Post } from './../models/post';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.postService.postAdded.subscribe(posts => {
      this.posts = posts;
    })
  }
}
