import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  levelList = ["Beginner", "Intermediate", "Export"];
  
  // editForm !: FormGroup;

  editForm = this.formBuilder.group({
    Coursecategory: ['', Validators.required],
    Coursestartdate: ['', Validators.required],
    Format: ['', Validators.required],
    Price: ['', Validators.required],
    Description: ['', Validators.required],
    Level: ['', Validators.required],

  });

  constructor(private formBuilder: FormBuilder, private router:ActivatedRoute, private authservice:AuthService) { }


  ngOnInit(): void {
    console.warn(this.router.snapshot.params.course_Id)
    this.authservice.getCurrentCourse(this.router.snapshot.params.course_Id)
    .subscribe((result)=>{
      this.editForm = this.formBuilder.group({
        Coursecategory: new FormControl(result['Coursecategory']),
        Coursestartdate: new FormControl(result['Coursestartdate']),
        Format: new FormControl(result['Format']),
        Price: new FormControl(result['Price']),
        Description: new FormControl(result['Description']),
        Level: new FormControl(result['Level']),
    
      });
    });

   
   
  }



}
