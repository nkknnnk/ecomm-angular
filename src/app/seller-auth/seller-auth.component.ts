import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService, private router:Router ){}
  showLogin = false
  authError:string = ''
  ngOnInit():void{
    this.seller.reloadSeller(34,45)
  }
  signUp(data: SignUp): void {
    this.seller.userSignUp(data)
  }
  Login(data: Login): void {
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or password is not correct"
      }
    })
  }
  openLogin(condition: boolean){
    this.showLogin=condition
  }
}











// export class SellerAuthComponent {
//   constructor(private seller:SellerService, private router:Router ){}
//   signUp(data: SignUp): void {
//     this.seller.userSignUp(data).subscribe((result)=>{
//       if(result){
//         this.router.navigate(['seller-home'])
//       }
//     });
//   }
// }
