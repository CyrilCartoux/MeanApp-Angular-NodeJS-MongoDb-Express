import { mimeType } from './mime-type.validator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostsService } from './../services/posts.service';
import { Post } from './../models/post';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
  imagePreview: string;
  postCreateForm: FormGroup;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Init form
    this.postCreateForm = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    // get the id from the route then fetch the post
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      if (data.has('postId')) {
        this.isLoading = true;
        this.editMode = true;
        this.postId = data.get('postId');
        this.postsService.getPost(this.postId)
          .subscribe((post) => {
            this.isLoading = false;
            this.postToEdit = { id: post._id, title: post.title, content: post.content };
            console.log(this.postToEdit)
            this.postCreateForm.setValue({
              title: this.postToEdit.title,
              content: this.postToEdit.content,
              image: null
            });
            console.log(this.postToEdit.content)
          });
      } else {
        this.editMode = false;
        this.postId = null;
      }
    });
  }


  onSavePost() {
    const post: Post = {
      id: null,
      title: this.postCreateForm.value.title,
      content: this.postCreateForm.value.content
    };
    if (this.postCreateForm.invalid) {
      return;
    }
    if (this.editMode) {
      this.postsService.editPost(this.postId, post);
    } else {
      this.postsService.addPost(post, this.postCreateForm.value.image);
    }
    this.postCreateForm.reset();
    this.router.navigateByUrl('/');
  }

  onImagePicked(event: Event) {
    // tell typescript this is a htmlInputelement otherwise it wont recognise the .files
    const file = (event.target as HTMLInputElement).files[0];
    this.postCreateForm.patchValue({ image: file });
    this.postCreateForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file)
  }

}
