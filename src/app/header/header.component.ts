import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName: string = 'Seller Name'
  userName: string = 'Seller Name'
  searchResult: undefined | addProduct[]
  cartItem: number = 0;

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          this.menuType = 'seller'
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name ? userData.name : userData[0].name;
          this.menuType = 'user'
          this.product.getCartList(userData._id ? userData._id : userData[0]._id)

        } else {
          this.menuType = 'default'
        }
      }
    })

    if (localStorage.getItem('seller')) {
      let sellerStore = localStorage.getItem('seller')
      let sellerData = sellerStore && JSON.parse(sellerStore)
      this.sellerName = sellerData.name?sellerData.name:sellerData[0].name
    }

    let cartData = localStorage.getItem('localCart')
    if (localStorage.getItem('localCart')) {
      this.cartItem = cartData && JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items) => {
      this.cartItem = items.length
    })
  }

  sellerLogout() {
    localStorage.removeItem('seller')
  }
  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5
        }
        this.searchResult = result
      })
    }

  }
  hideSearch() {
    setTimeout(() => {
      this.searchResult = undefined
    }, 200);
  }
  submitSearch(query: string) {
    this.route.navigate([`search/${query}`])

  }

}
