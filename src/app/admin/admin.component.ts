import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Register } from 'src/app/Model/register';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

 constructor(private observer: BreakpointObserver, private dialog: MatDialog, private authservice: AuthService, private toast: NgToastService) {}
  columns = ["UserName", "Email","RoleType"];

  index=["userName","email","roleType"];
  registers:Register[] =[];

  ngOnInit(): void {

       this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

     this.authservice.getusers().subscribe(

    (response)=>{
      this.registers=response;
    },
    (error)=>console.log(error)
   
    ) 
  }








 


}

 



 
  // data: any = [];
  

  // constructor(private authservice:AuthService, private toast: NgToastService) { }

  
  // columns = ["UserName", "Email","RoleType"];

  // index=["userName","email","roleType"];
  // registers:Register[] =[];

  //ngOnInit(): void {
    // this.authservice.getusers().subscribe(

    // (response)=>{
    //   this.registers=response;
    // },
    // (error)=>console.log(error)
   
    // ) 
  //}



