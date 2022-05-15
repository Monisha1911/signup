import { Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  levelList = ["Beginner", "Intermediate", "Export"];
  courseForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder,private toast: NgToastService,
    private authservice: AuthService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,

  ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      Coursecategory: ['', Validators.required],
      Coursestartdate: ['', Validators.required],
      Format: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      Level: ['', Validators.required],

    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.courseForm.controls['Coursecategory'].setValue(this.editData.Coursecategory);
      this.courseForm.controls['Coursestartdate'].setValue(this.editData.Coursestartdate);
      this.courseForm.controls['Format'].setValue(this.editData.Format);
      this.courseForm.controls['Price'].setValue(this.editData.Price);
      this.courseForm.controls['Description'].setValue(this.editData.Description);
      this.courseForm.controls['Level'].setValue(this.editData.Level);

    }

  }
  addCourse() {
    // if (this.editData) {
     
    // } else {
    //   this.updatecourse()
    // }
    if (this.courseForm.valid) {
      this.authservice.postCourse(this.courseForm.value)
        .subscribe({
          next: (res) => {
            // alert("course added successfully");
            this.toast.success({ detail: "Success Message", summary: "course added successfully", duration: 2000 });
            this.courseForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error while adding the course")
            this.toast.error({ detail: "Error Message", summary: "Error while adding the course", duration: 3000 });

          }
        })
    }
  }

  updatecourse() {
    this.authservice.putcourse(this.courseForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          // alert("course updated successfully");
          this.toast.success({ detail: "Success Message", summary: "course updated successfully", duration: 2000 });

          this.courseForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error while updating the record  !!");
          this.toast.error({ detail: "Error Message", summary: "Error while updating the course", duration: 3000 });

        }
      })
  }

}
