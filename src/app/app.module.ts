import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import {TokenInterceptorService} from './Services/token-interceptor.service';
import { AuthService } from './Services/auth.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CoursesComponent } from './components/courses/courses.component';
import { MaterialComponent } from './components/material/material.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CoursesComponent,
    MaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    NgToastModule,
    ToastrModule.forRoot(), 
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [AuthService,{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
