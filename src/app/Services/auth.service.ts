import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../Model/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject:BehaviorSubject<Register>;
  public user: Observable<Register>;

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

  putcourse(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/courseList/" + id,data)
  }

  deletecourse(id:number){
    return this.http.delete<any>("https://localhost:5001/api/Authenticate/delete Courses?Id=" + id);
  }


}
