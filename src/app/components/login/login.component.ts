import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Register } from 'src/app/Model/register';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ApiService } from 'src/app/Services/api.service';
// import { first } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userSubject:BehaviorSubject<Register>;
  public user: Observable<Register>;
  hide = true;
  data: any;
  fab:Register;


  loginForm!: FormGroup;

  constructor(private authservice: AuthService, private router: Router, private toast: NgToastService, private http : HttpClient, ) { 
    
    this.userSubject = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

  }

  public get userValue(): Register {
    return this.userSubject.value;
  }

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
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        // sessionStorage.setItem('token', user.token);
        this.toast.success({ detail: "Success Message", summary: "login Succesfull", duration: 2000 })
        this.loginForm.reset();
        
        // sessionStorage.setItem('loggedUser', this.data.Username);
        this.router.navigate(['dashboard']);
        return user;
      }
    }, (error => {
      this.toast.error({ detail: "Error Message", summary: error.error.message, duration: 3000 })
    }))
  }

  


}




