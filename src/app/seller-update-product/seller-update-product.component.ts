import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData:undefined|addProduct
  constructor(private route: ActivatedRoute, private product: ProductService,private router: Router) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data)=>{
      this.productData = data
    })
  }
  updateProduct1(data: addProduct) {
    console.log(data)
    if(this.productData){
      data._id=this.productData._id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      console.log(result)
      if(result){
        this.router.navigate(['/seller-home']);
      }
    })
  }
}
