import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, userRegestrition } from '../data-type';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false)
  isLogin = new EventEmitter<boolean>(false)


  constructor(private http: HttpClient, private router: Router) { }

  userRegistration(data: userRegestrition) {
    return this.http.post(`${environment.apiUrl}users`, data, {observe: 'response'}).subscribe((result)=>{
      console.log(result)
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }


  userLogin(data: Login) {
    const body = { email: data.email, password: data.password };
    this.http.post(`${environment.apiUrl}users/login`, body, { observe: 'response' }).subscribe((result: any) => {
      console.log(result)
      if (result.body) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
        this.isLogin.emit(true)

      } else {
        this.isLoginError.emit(true)
      }
    })
  }
}
