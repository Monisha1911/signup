import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../Model/register';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private userSubject:BehaviorSubject<Register>;
  public user: Observable<Register>;

  constructor(private http: HttpClient, private router:Router) {
    this.userSubject = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Register {
    return this.userSubject.value;
  }

  // login(data: any): Observable<Register> {
  //   return this.http.post<Register>("http://localhost:5000/api/Authentication/Login",data)
  //     .pipe(map(user =>{
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //       return user;
  //     }));
  // }

  // getAll(){
  //   return this.http.get<Register[]>(`${environment.apiUrl}/users`);
  // }

  
  
}