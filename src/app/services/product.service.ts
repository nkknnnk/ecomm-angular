import { EventEmitter, Injectable } from '@angular/core';
import { addProduct, cart, order } from '../data-type';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<addProduct[] | []>();

  constructor(private http: HttpClient) { }
  addProduct(data: addProduct) {
    return this.http.post(`${environment.apiUrl}products/add`, data)
  }
  productList() {
    return this.http.get<addProduct[]>(`${environment.apiUrl}products`)
  }
  deleteProduct(id: string|number) {
    console.log(id)
    return this.http.delete<addProduct[]>(`${environment.apiUrl}products/delete/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<addProduct>(`${environment.apiUrl}products/getone/${id}`)
  }
  updateProduct(product: addProduct) {
    return this.http.put<addProduct[]>(`${environment.apiUrl}products/update/${product._id}`, product)
  }
  popularProducts() {
    return this.http.get<addProduct[]>(`${environment.apiUrl}products`)
  }

  trendyProducts() {
    return this.http.get<addProduct[]>(`${environment.apiUrl}products`)
  }
  searchProducts(query: string) {
    return this.http.get<addProduct[]>(`${environment.apiUrl}products/search/${query}`)
  }

  localAddtoCart(data: addProduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }
  removeItemFromCart(productId: number|string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: addProduct[] = JSON.parse(cartData);
      items = items.filter((item: addProduct) => productId !== item._id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }
  addToCart(cartData: cart) {
    return this.http.post(`${environment.apiUrl}cart/addToCart`, cartData)
  }
  getCartList(userId: number) {
    return this.http.get<addProduct[]>(`${environment.apiUrl}cart/` + userId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        result.body && this.cartData.emit(result.body)
      }
    })
  }
  removeToCart(cartId:number|string){
    return this.http.delete(`${environment.apiUrl}cart/`+cartId)
  }
  currentCart(){
    let userStore = localStorage.getItem('user')
    let userId = userStore && JSON.parse(userStore)._id?JSON.parse(userStore)._id: userStore && JSON.parse(userStore)[0]._id
    return this.http.get<cart[]>(`${environment.apiUrl}cart/`+userId)
  }
  orderNow(data:order){
    return this.http.post(`${environment.apiUrl}orders/createOrder`, data)
  }
  orderList(){
    let userStore = localStorage.getItem('user')
    let userId = userStore && JSON.parse(userStore)._id?JSON.parse(userStore)._id: userStore && JSON.parse(userStore)[0]._id
    return this.http.get<order[]>(`${environment.apiUrl}orders/`+userId)
  }
  deleteCartItem(cartId:number|string){
    return this.http.delete(`${environment.apiUrl}cart/`+cartId, {observe: 'response'}).subscribe(result=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }
  cancelOrder(orderId: number|string){
    return this.http.delete(`${environment.apiUrl}orders/`+orderId)
  }
}
