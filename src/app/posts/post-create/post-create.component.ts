import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  isLoading = false;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.isLoading = true;
      if (data.has('postId')) {
        this.editMode = true;
        this.postId = data.get('postId');
        this.postsService.getPost(this.postId)
          .subscribe((post) => {
            this.isLoading = false;
            this.postToEdit = { id: post._id, title: post.title, content: post.content };
          });
      } else {
        this.editMode = false;
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
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
    } else {
      this.postsService.addPost(post);
    }
    form.resetForm();
    this.router.navigateByUrl('/');
  }

}
