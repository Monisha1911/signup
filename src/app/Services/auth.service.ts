import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Register } from '../Model/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  postData(data: any) :Observable<any>{
    let url = "http://localhost:5000/api/Authentication/Register";
    console.log(data)
    return this.http.post(url, data);
  }

  
  loginData(data: any) : Observable<any>{
    let url1 = "http://localhost:5000/api/Authentication/Login";
    console.log(data)
    return this.http.post(url1, data);

  }

  getToken(){
    return sessionStorage.getItem('token')
  }

  postCourse(data:any){
    return this.http.post<any>("http://localhost:3000/courseList/",data);
  }

  getcourse(){
    return this.http.get<any>("http://localhost:3000/courseList/");
  }

  putcourse(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/courseList/" + id,data)
  }

  deletecourse(id:number){
    return this.http.delete<any>("http://localhost:3000/courseList/" + id);
  }


}
