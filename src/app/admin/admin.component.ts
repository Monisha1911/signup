import { Component, OnInit } from '@angular/core';
import { Register } from '../Model/register';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: Register[] = []

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    
  }

}
