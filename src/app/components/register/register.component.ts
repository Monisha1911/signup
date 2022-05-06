// import { AuthService } from 'src/app/Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { MustMatch } from 'src/app/Helpers/must-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  submitted = false;
  formGroup: any;
  // confirmpassword: any;

  constructor(private router: Router, private http: HttpClient, private authservice: AuthService
    , private toast: NgToastService,) { }






  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.required]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),

    },
      { validators: MustMatch('password', 'confirmpassword') }
    )
  }

  get f() {
    return this.registerForm.controls;
  }


  getformdata(data) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

    console.log(this.registerForm.value)
    this.authservice.postData(this.registerForm.value).subscribe((res) => {
      console.log(res);
      if (res.status == "error") {

      }

      //alert("Signup Succesfull");
      //this.toast.success(detail:"Signup Succesfull")
      this.toast.success({ detail: "Success Message", summary: "Register Succesfull", duration: 2000 })

      this.registerForm.reset();
      this.router.navigate(['login']);
    }, (error => {
      console.log(error)
      this.toast.error({ detail: "Error Message", summary: error.message, duration: 3000 })

    }))



  }


  /* Shorthands for form controls (used from within template) */
  get password() { return this.formGroup.get('password'); }
  get confirmpassword() { return this.formGroup.get('confirmpassword'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.confirmpassword.setErrors([{ 'passwordMismatch': true }]);
    else
      this.confirmpassword.setErrors(null);
  }

}




