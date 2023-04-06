import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  totalPrice: number | undefined
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result
      let price = 0;
      result.forEach((item) => {
        price = price + Number(item.price) * Number(item.quantity)
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price - price / 10 + price / 10 + 100
    })
  }
  orderNow(data: any) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)._id?JSON.parse(user)._id: user && JSON.parse(user)[0]._id
    if (this.priceSummary.total) {
      let orderData: order = {
        ...data,
        totalPrice: this.priceSummary.total,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => { 
        setTimeout(()=>{
          item._id&& this.product.deleteCartItem(item._id)
        },400)
       })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          // alert('successfully Placed Your Order')
          this.router.navigate(['/my-orders'])
        }
      })
    }

  }
}
