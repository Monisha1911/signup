import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  editForm !: FormGroup;
  levelList = ["Beginner", "Intermediate", "Export"];


  // editForm = new FormGroup({
  //   course_Id:new FormControl(''),
  //   Coursecategory: new FormControl(''),
  //   Coursestartdate: new FormControl(''),
  //   Format: new FormControl(''),
  //   Price: new FormControl(''),
  //   Description: new FormControl(''),
  //   Level: new FormControl(''),

  // })

  constructor(private formBuilder: FormBuilder,

    private router: ActivatedRoute, private authservice: AuthService) { }


  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      course_Id: ['', Validators.required],
      Coursecategory: ['', Validators.required],
      Coursestartdate: ['', Validators.required],
      Format: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      Level: ['', Validators.required],

    });
    //  if (this.editData) {
    //   this.editForm.controls['Coursecategory'].setValue(this.editData.Coursecategory);
    //   this.editForm.controls['Coursestartdate'].setValue(this.editData.Coursestartdate);
    //   this.editForm.controls['Format'].setValue(this.editData.Format);
    //   this.editForm.controls['Price'].setValue(this.editData.Price);
    //   this.editForm.controls['Description'].setValue(this.editData.Description);
    //   this.editForm.controls['Level'].setValue(this.editData.Level);

    // }

    console.warn(this.router.snapshot.params.course_Id)
    this.authservice.getCurrentCourse(this.router.snapshot.params.course_Id)
      .subscribe((result) => {
        console.warn("result", result)

        this.editForm = new FormGroup({
          course_Id: new FormControl(result['course_Id']),
          Coursecategory: new FormControl(result['coursecategory']),
          Coursestartdate: new FormControl(result['coursestartdate']),
          Format: new FormControl(result['format']),
          Price: new FormControl(result['price']),
          Description: new FormControl(result['description']),
          Level: new FormControl(result['level']),

        })

      })


  }

  // collection(){
  //   // console.warn(this.editForm.value);
  //   this.authservice.editData(this.router.snapshot.params.course_Id,this.editForm.value).subscribe((result)=>{
  //     console.warn(result)
  //   })
  // }

  editCourse() {
    // console.warn(this.editForm.value);
    this.authservice.editData(this.router.snapshot.params.course_Id, this.editForm.value).subscribe((result) => {
      console.warn(result)
    })


  }






}
