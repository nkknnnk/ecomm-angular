import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | addProduct
  noOfItems: number = 1
  removeCart = false;
  cartData: addProduct | undefined;
  constructor(private activateRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
    })

    let cartData = localStorage.getItem('localCart')
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: addProduct) => productId == item._id.toString())
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
    let user = localStorage.getItem('user')
    if (user) {
      let userId = user && JSON.parse(user)._id?JSON.parse(user)._id: user && JSON.parse(user)[0]._id
      this.product.getCartList(userId)
      this.product.cartData.subscribe((result) => {
        let item = result.filter((item: addProduct) => productId?.toString() === item.productId?.toString())
        if (item.length) {
          this.cartData = item[0]
          this.removeCart = true;
        }
      })
    }

  }

  handleInput(val: number) {
    if (val === 1 && this.noOfItems > 0 && this.noOfItems < 20) {
      this.noOfItems += val
    }
    if (val === -1 && this.noOfItems > 1 && this.noOfItems <= 20) {
      this.noOfItems += val
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.noOfItems
      if (!localStorage.getItem('user')) {
        this.product.localAddtoCart(this.productData)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user)._id?JSON.parse(user)._id: user && JSON.parse(user)[0]._id
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData._id
        }
        delete cartData._id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })

      }
    }
  }
  removeToCart(productId: number|string) {
    if (localStorage.getItem('user')) {
      this.cartData && this.product.removeToCart(this.cartData._id).subscribe((result)=>{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id?JSON.parse(user).id: user && JSON.parse(user)[0]._id
        if(result){
          this.product.getCartList(userId)
          this.removeCart=false
        }
      })
    } else {
      this.product.removeItemFromCart(productId)
      this.removeCart = false;
    }
  }
}
