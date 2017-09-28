import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {


   rForm: FormGroup;
   post:any;                     // A property for our submitted form
   description:string = '';
   name:string = '';

   constructor(private fb: FormBuilder/*, private router: Router*/) {

     this.rForm = fb.group({
       'name' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])]
     });

   }

    ngOnInit() {
    }

    addPost(post) {
      alert("test");
    //  this.router.navigate(['view']);
    this.description = post.description;
    this.name = post.name;
  }


}
