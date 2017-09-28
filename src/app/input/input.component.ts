import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {


   rForm: FormGroup;
   post:any;                     // A property for our submitted form
   description:string = '';
   model = {};
   @ViewChild('hardwareVideo') hardwareVideo: any;
  // name:string = '';

   constructor(private fb: FormBuilder, private router: Router, public snackBar: MdSnackBar) {

     this.rForm = fb.group({
       'productCode' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(50)])]
     });




   }

    ngOnInit() {
    }

    onSubmitClick(post) {
      var enteredProductCode = this.rForm.getRawValue().productCode;
      alert(enteredProductCode);
      this.router.navigate(['view', {productid:enteredProductCode}]);
    //  this.router.navigate(['view']);
    this.description = post.description;
  }


  decodedOutput(scannedResult) {
    //alert(scannedResult);
    this.snackBar.open(scannedResult);
    this.router.navigate(['view', {productid:scannedResult}]);
  }

  onScanClick() {
    // let video = this.hardwareVideo.nativeElement;
    //
    //    var n = <any>navigator;
    //
    //    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    //
    //    n.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    //        video.src = window.URL.createObjectURL(stream);
    //        video.play();
    //    });
}

}
