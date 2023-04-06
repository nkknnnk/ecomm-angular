import { Component, OnInit } from '@angular/core';
import { addProduct, cart, Login, userRegestrition } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin = true
  authError: string = ''

  constructor(private user: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload()
  }
  signUp(authData: userRegestrition) {
    this.user.userRegistration(authData)
  }

  Login(data: Login): void {
    this.user.userLogin(data)
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct"
        setTimeout(() => {
          this.authError = ""
        }, 3000);
      }

    })
    this.user.isLogin.subscribe((islogin) => {
      if (islogin) {
        this.localCartToRemortCart()
      }
    })
  }

  openLogin(condition: boolean) {
    this.showLogin = condition
  }
  localCartToRemortCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: addProduct[] = JSON.parse(data);
      cartDataList.forEach((product: addProduct, index) => {
        let cartData: cart = {
          ...product,
          productId: product._id,
          userId
        }
        delete cartData._id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {

              console.log("Item store in DB", result)
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')

          }
        }, 500)

      });
    }
    setTimeout(()=>{

      this.product.getCartList(userId)
    },1000)
  }
}
