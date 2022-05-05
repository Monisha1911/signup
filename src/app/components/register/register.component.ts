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
      email : new FormControl('',[ Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmpassword : new FormControl('',[Validators.required,Validators.minLength(6)]),
 
    },
    {
      
    })
  }

  get f(){
    return this.registerForm.controls;
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

   
    
  }

  Mustmatch(password:any,confirmpassword:any){
    return (formGroup: FormGroup)=>{
      const passwordcontrol=formGroup.controls[password];
      const confirmpasswordcontrol=formGroup.controls[confirmpassword];

      if(confirmpasswordcontrol.errors && !confirmpasswordcontrol.errors['Mustmatch']){
        return;
      }

      if(passwordcontrol.value!==confirmpasswordcontrol.value){
        confirmpasswordcontrol.setErrors({Mustmatch:true});
      }else{
        confirmpasswordcontrol.setErrors(null);

      }

    }
  }
 

}


