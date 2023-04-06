import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedResult: undefined | addProduct[]
  ifNosearchedResults = ''
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query')
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchedResult = result
      if(result.length===0){
        this.ifNosearchedResults="No Items found"
      }
    })
  }

}
