import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  // loading = true;


  loginForm!: FormGroup;

  constructor(private authservice: AuthService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
    );
  }

  onLogin() {
    // let auth_token = "asasa21212....";

    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${auth_token}`
    //   });

    // const requestOptions = { headers: headers };
    console.log(this.loginForm.value)
    this.authservice.loginData(this.loginForm.value).subscribe((res) => {
      console.log(res);
      const user = res;
      if (user) {
        sessionStorage.setItem('token', user.token);
        // localStorage.setItem('userName',user.userName);
        this.toast.success({ detail: "Success Message", summary: "login Succesfull", duration: 2000 })
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }
    }, (error => {
      this.toast.error({ detail: "Error Message", summary: error.status, duration: 3000 })
    }))
  }

}
