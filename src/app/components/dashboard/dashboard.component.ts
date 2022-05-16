import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Register } from 'src/app/Model/register';
import { AuthService } from 'src/app/Services/auth.service';
// import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  fab : Register;
  user : Register;
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  userDisplayName = '';


  constructor(private observer: BreakpointObserver, private authservice:AuthService) { 

    this.fab = this.authservice.userValue;
  }

  ngOnInit() {
    this.userDisplayName = localStorage.getItem('loggedUser');

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

  // profiletag()
  // {
  //   this.showMe = !this.showMe
  // }
  myFunction(){
  document.getElementById("myDropdown").classList.toggle("show");

  }
  
}
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown menu if the user clicks outside of it
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





