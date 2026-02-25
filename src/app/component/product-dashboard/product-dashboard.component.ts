import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit {
  productsArr: Iproduct[] = [];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this._productService.fetchProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.productsArr = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
