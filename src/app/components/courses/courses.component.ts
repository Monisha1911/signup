import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Register } from 'src/app/Model/register';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  fab : Register;

  displayedColumns: string[] = ['Coursecategory', 'Coursestartdate', 'Description', 'Format', 'Level','Price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  userDisplayName = '';
  constructor(private observer: BreakpointObserver, private dialog : MatDialog, private authservice : AuthService,private toast: NgToastService) { 
    this.fab = this.authservice.userValue;
  }

  ngOnInit(): void {
    this.userDisplayName = localStorage.getItem('loggedUser');

    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'    
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.authservice.getcourse()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },error:(err)=>{
        // alert("Error while fetching the Records!!");
      this.toast.error({ detail: "Error Message", summary: "Error while fetching the Records!!", duration: 3000 })

      }
    })
  }

  editcourse(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }

  deletecourse(id:number){
    this.authservice.deletecourse(id)
    .subscribe({
      next:(res)=>{
        // alert("product deleted successfully");
        this.toast.success({ detail: "Success Message", summary: "product deleted successfully", duration: 2000 })

        this.getAllProducts();
      },
      error:()=>{
        // alert("Error while deleting the course!!");
      this.toast.error({ detail: "Error Message", summary: "Error while deleting the Records!!", duration: 3000 })

      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  myFunction(){
    document.getElementById("myDropdown").classList.toggle("show");
  
    }


}
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}