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


}
