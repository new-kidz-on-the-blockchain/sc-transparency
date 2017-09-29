import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RouterModule, Routes, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {


  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  description = '';


  constructor(private fb: FormBuilder, private router: Router, public snackBar: MdSnackBar) {
    this.rForm = fb.group({
      'productCode': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])]
    });
  }

  ngOnInit() {
  }

  onSubmitClick(post) {
    const enteredProductCode = this.rForm.getRawValue().productCode;
    this.router.navigate(['view'], {queryParams: {productid: enteredProductCode}});
    //  this.router.navigate(['view']);
    this.description = post.description;
  }


  decodedOutput(scannedResult) {
    // alert(scannedResult);
    this.snackBar.open(scannedResult);
    this.router.navigate(['view'], {queryParams: {productid: scannedResult}});
  }
}
