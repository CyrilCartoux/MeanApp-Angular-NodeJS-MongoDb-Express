import { PostsService } from './../services/posts.service';
import { Post } from './../models/post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subscription: Subscription;

  constructor(
    private postService: PostsService,
    private router: Router
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

  onEditPost(postId: string) {
    this.router.navigateByUrl('edit/' + postId);
  }
}
