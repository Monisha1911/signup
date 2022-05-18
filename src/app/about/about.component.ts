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
import { Courses } from 'src/app/Model/courses';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  fab: Register;
  data: any = [];
  rolename: string;

  displayedColumns: string[] = ['Coursecategory', 'Coursestartdate', 'Description', 'Format', 'Level', 'Price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  userDisplayName = '';
  constructor(private observer: BreakpointObserver, private dialog: MatDialog, private authservice: AuthService, private toast: NgToastService) {
    this.fab = this.authservice.userValue;
  }

  

  columns = ["Course_Id","Course Category","Course Start Date","Description","Format","Level","Price","Action"];

  index=["course_Id","coursecategory","coursestartdate","description","format","level","price"];
  

  courses:Courses[]=[];


  ngOnInit(): void {
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.rolename = localStorage.getItem('user.rolename');

    this.getAllProducts();
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

  



  getAllProducts() {
    this.authservice.getcourse().subscribe(
      (response)=>{
        this.courses=response;
      },
      (error)=>console.log(error)
     
      
    )

  }

  deletecourse(j) {

    this.authservice.deleteData(j).subscribe(data => {
      this.getAllProducts();
      this.toast.success({ detail: "Success Message", summary: "Course Deleted Successfully", duration: 3000 })
    })

  }
  edit(row, index) {


  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  myFunction() {
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
