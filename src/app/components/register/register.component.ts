// import { AuthService } from 'src/app/Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import {NgToastService} from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;



  constructor(private router:Router, private http:HttpClient,private authservice:AuthService
    ,private toast:NgToastService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName : new FormControl('',[Validators.required, Validators.required]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)])
    }
    );
  }


  getformdata(data){
    console.log(this.registerForm.value)
    this.authservice.postData(this.registerForm.value).subscribe((res)=>{
      console.log(res);
      if(res.status=="error"){
        
      }
      
      //alert("Signup Succesfull");
      //this.toast.success(detail:"Signup Succesfull")
      this.toast.success({detail:"Success Message",summary:"Register Succesfull",duration:2000})

      this.registerForm.reset();
      this.router.navigate(['login']);
    },(error=>{
      console.log(error)
      this.toast.error({detail:"Error Message",summary:"Message",duration:3000})

    }))

    /* this.authservice.postData(data)
    .subscribe(res=>{
      alert("Signup Succesfull");
      this.registerForm.reset();
      this.router.navigate(['login']); 
    },err=>{
      console.log(err)
     // alert("something went wrong")
    })
    console.log(data); */
    
  }

  // onSubmit(data){
  //   this.http.post('http://localhost:5000/api/Authentication/Register',data).subscribe((result)=>{
  //     console.warn("result",result)
  //   })
  //   console.warn(data);

  // }

 

}


