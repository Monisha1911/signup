import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../Model/register';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    return this.http.post('login', { userName, password });
  }

  getregisters(): Observable<Register[]> {
    return this.http.get<Register[]>('registers', {
      headers: {},
    });
  }
}