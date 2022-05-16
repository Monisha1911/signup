import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../Model/register';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
})
export class ProfileComponent implements OnInit {
  user: Register;
  Form : FormGroup;
  editMode:boolean = true;

  constructor(private fb: FormBuilder, private router:Router , private activatedRoute:ActivatedRoute, private authservice:AuthService) {
    this.user = this.authservice.userValue;
   }

  ngOnInit(): void {
    this.Form = this.fb.group({
      name:['Edit Name'],
      Email: ['Edit Email']
    })
  }

  onPrfSubmit(){
    if(this.Form.valid){
      console.log(this.Form.value);
    }else{
      let key = Object.keys(this.Form.controls);
      // console.log(key);
      key.filter(data =>{
        // console.log(data);
        let control = this.Form.controls[data];
        // console.log(control);
        if(control ! =null){
          control.markAsTouched();
        }

      })
    }
  }


  onDiscard(){
    this.Form.reset();
    this.router.navigate([], {queryParams:{EditMode:null}})
  }

}
