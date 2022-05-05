// import { Injectable } from '@angular/core';
// import {HttpInterceptor} from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenInterceptorService implements HttpInterceptor {

//   constructor() { }

//   intercept(req, next){
//     let tokenizedReq = req.clone({
//       setHeaders: {
//         Authorization: 'Bearer xx.yy.zz'
//       }
//     })
//     return next.handle(tokenizedReq)
//   }
// }

import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector, private authService:AuthService) { }

  intercept(req, next){
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        // Authorization:  `Bearer ${authService.getToken()}`
        Authorization:  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZmZmZiIsImp0aSI6IjEwMzllMGYxLWU4YTgtNDAzNC1iNWVlLTQ3ZjVjMmFiZWMwZCIsImV4cCI6MTY1MTc1NDY2MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.R6Bq3HLD2-Cz57oHuaFy5PiZ2oMiA3auvvecHvbnMHk'

      }
    })
    return next.handle(tokenizedReq)
  }
}
