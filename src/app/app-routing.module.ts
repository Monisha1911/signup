import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialComponent } from './components/material/material.component';
import { RegisterComponent } from './components/register/register.component';
// import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'' ,component:LoginComponent},
  {path:'dashboard' ,component:DashboardComponent},
  {path:'courses' , component:CoursesComponent},
  {path:'material' , component:MaterialComponent},
  // {path:'profile' , component:ProfileComponent},
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegisterComponent},
  {path:'admin', component:AdminComponent},
  {path:'update/:course_Id',component:UpdateComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
