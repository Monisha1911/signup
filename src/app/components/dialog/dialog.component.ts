import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  levelList = ["Beginner" ,"Intermediate", "Export"];
  courseForm !:FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      Coursecategory :['',Validators.required],
      Coursestartdate:['',Validators.required],
      Format:['',Validators.required],
      Price:['',Validators.required],
      Description:['',Validators.required],
      Level:['',Validators.required],




    })
  }

}
