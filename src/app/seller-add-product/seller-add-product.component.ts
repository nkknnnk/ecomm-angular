import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit{
  constructor(private addProductservice: ProductService, private http: HttpClient) { }
  ngOnInit():void{

  }
  addproductmsg = ''
  addproduct1(data: addProduct) {
    this.addProductservice.addProduct(data).subscribe((result)=>{
      if(result){
        this.addproductmsg= "Product added Succesfully"
      }
      setTimeout(() => {
        this.addproductmsg=""
      }, 3000);
    })
  }
}
