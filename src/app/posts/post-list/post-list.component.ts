import { PostsService } from './../services/posts.service';
import { Post } from './../models/post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subscription: Subscription;

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.subscription = this.postService.postAdded.subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeletePost(postId: string) {
    this.postService.deletePost(postId);
  }

}
