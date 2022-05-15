import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  // loading = true;
  data: any;


  loginForm!: FormGroup;

  constructor(private authservice: AuthService, private router: Router, private toast: NgToastService, private http : HttpClient) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
    );
  }

  onLogin() {

    console.log(this.loginForm.value)
    this.authservice.loginData(this.loginForm.value).subscribe((res) => {
      console.log(res);
      const user = res;
      if (user) {
        sessionStorage.setItem('token', user.token);
        this.toast.success({ detail: "Success Message", summary: "login Succesfull", duration: 2000 })
        this.loginForm.reset();
        // sessionStorage.setItem('loggedUser', this.data.Username);
        this.router.navigate(['dashboard']);
      }
    }, (error => {
      this.toast.error({ detail: "Error Message", summary: error.message, duration: 3000 })
    }))
  }

  // getUser(){
  //  this.authservice.getUserData(this.getUser).subscribe((res)=>{
  //   console.log(res);

  //  })
  // }


}
