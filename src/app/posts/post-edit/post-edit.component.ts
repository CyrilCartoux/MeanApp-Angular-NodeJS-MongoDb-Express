import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  idToEdit: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(+this.activatedRoute.snapshot.params);
  }

}
