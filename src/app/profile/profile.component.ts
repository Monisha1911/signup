import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
})
export class ProfileComponent implements OnInit {
  Form : FormGroup;
  editMode:boolean = true;

  constructor(private fb: FormBuilder, private router:Router , private activatedRoute:ActivatedRoute) { }

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