import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../Model/register';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject:BehaviorSubject<Register>;
  public user: Observable<Register>;
  tokenres: any;

  constructor(private http: HttpClient) {
     this.userSubject = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

   }

   public get userValue(): Register {
    return this.userSubject.value;
  }

  postData(data: any) :Observable<any>{
    let url = "https://localhost:5001/api/Authenticate/register";
    console.log(data)
    return this.http.post(url, data);
  }

  
  loginData(data: any) : Observable<any>{
    let url1 = "https://localhost:5001/api/Authenticate/login";
    console.log(data)
    return this.http.post(url1, data);
  }
  
  // getUserData(data:any) :Observable<any> {
  //   let url2 = "http://localhost:5000/api/Authentication";
  //   console.log(data)
  //   return this.http.get(url2,data);
    
  // }

  // getUserData(){
  //   this.http.get<any>(`http://localhost:5000/api/Authentication`)
  // }


  getToken(){
    return sessionStorage.getItem('token')
  }

  postCourse(data:any){
    return this.http.post<any>("https://localhost:5001/api/Authenticate/Add Courses/",data);
  }

  getcourse(){
    return this.http.get<any>("https://localhost:5001/api/Authenticate/get courses/");
  }

  // putcourse(data:any,id : number){
  //   return this.http.put<any>("https://localhost:5001/api/Authenticate/edit" + id,data)
  // }

  // url5="https://localhost:5001/api/Authenticate/delete"

  // deletecourse(course_Id){
  //   return this.http.delete<any>(`${this.url5}/${course_Id}`);
  // }

  // url6="https://localhost:5001/api/Authenticate/GetByID?Course_ID="
  getCurrentCourse(course_Id){
    return this.http.get('https://localhost:5001/api/Authenticate/GetByID?Course_ID='+course_Id)
  }

  deleteData(course_Id){
    return this.http.delete('https://localhost:5001/api/Authenticate/delete Courses?Id='+course_Id)
       
  }

// url7="https://localhost:5001/api/Authenticate/update Course"

  editData(data,course_Id){
    // return this.http.put(`${this.url7}/${course_Id}`,data)
    return this.http.put<any>("https://localhost:5001/api/Authenticate/update Course" + course_Id,data)       
  }

 

  GetRolebyToken(token:any){
    let _token= null;
    this.tokenres=JSON.parse(atob(_token))
    return this.tokenres.rolename;
  }


}
