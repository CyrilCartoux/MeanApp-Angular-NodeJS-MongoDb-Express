import { Post } from './../models/post';
import { PostsService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  idToEdit: string;
  postToEdit: Post;
  posts: Post[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((data: Params) => {
      this.idToEdit = data.postId;
      console.log(this.idToEdit)
    });
  }

}
