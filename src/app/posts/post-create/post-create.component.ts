import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { Post } from './../models/post';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  editMode = false;
  postId: string;
  postToEdit: Post;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      if (data.has('postId')) {
        this.editMode = true;
        this.postId = data.get('postId');
        this.postToEdit = this.postsService.getPost(this.postId);
        console.log(this.postToEdit)
      } else {
        this.editMode = false;
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    if (form.invalid) {
      return;
    }
    if (this.editMode) {
      this.postsService.editPost(this.postId, post);
      form.resetForm()
    } else {
      this.postsService.addPost(post);
      form.resetForm();
    }
  }

}
