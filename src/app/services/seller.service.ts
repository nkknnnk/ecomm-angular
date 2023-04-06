import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }


  userSignUp(data: SignUp) {

    this.http.post(`${environment.apiUrl}sellers`, data, { observe: 'response' }).subscribe((result) => {
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    })
  }

  reloadSeller(a: number, b: number) {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login) {
    const body = { email: data.email, password: data.password };
    this.http.post(`${environment.apiUrl}sellers/login`, body, { observe: 'response' }).subscribe((result: any) => {
      if (result.body) {
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      } else {
        this.isLoginError.emit(true)
      }
    })
  }

}
