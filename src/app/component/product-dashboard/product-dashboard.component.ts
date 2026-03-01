import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit {
  productsArr: Iproduct[] = [];
  selectedPorductId!: string;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _routes: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this._productService.setFirstProductSub$.subscribe({
      next: (flag) => {
        setTimeout(() => {
          if (flag) {
            this.selectedPorductId = this.productsArr[0].pid;
            this.setFirstProductAsSelected();
          }
        }, 0);
      },
    });
  }

  loadProducts() {
    this._productService.fetchProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.productsArr = data;
        this.selectedPorductId = data[0].pid;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setFirstProductAsSelected() {
    this._router.navigate([this.productsArr[0].pid], {
      relativeTo: this._routes,
      queryParams: {
        cr: this.productsArr[0].canReturn,
      },
    });
  }
  navigateToProduct(product: Iproduct) {
    this._router.navigate([product.pid], {
      relativeTo: this._routes,
      queryParams: {
        cr: product.canReturn,
      },
    });
    this.selectedPorductId = product.pid;
  }
}
