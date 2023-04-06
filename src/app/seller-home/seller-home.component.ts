import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList:undefined|addProduct[]
  delete = faTrash
  update = faEdit

  constructor(private product: ProductService){}

  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id:string|number){
    this.product.deleteProduct(id).subscribe((result)=>{
      console.log("product deleted")
      this.list()
    })
  }

  list(){
    this.product.productList().subscribe((result)=>{
      console.log(result)
      this.productList=result
      console.log(this.productList)
    })
  }

}
