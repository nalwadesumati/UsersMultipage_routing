import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  isInEditMode: boolean = false;
  productId!: string;
  productForm!: FormGroup;

  isProductReturn: boolean = false;
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductService,
    private _snackBar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.createProductForm();
    this.setEditMode();
  }

  createProductForm() {
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('Limited'),
      canReturn: new FormControl(1),
      imgUrl: new FormControl(null, [Validators.required]),
    });
  }

  setEditMode() {
    this.productId = this._routes.snapshot.params['pid'];
    if (this.productId) {
      this.isInEditMode = true;
      this._productService.fetchProductById(this.productId).subscribe({
        next: (data) => {
          this.productForm.patchValue(data);
          // if (data.canReturn === false) {
          //   this.productForm.disable;
          // }
          let canReturn = this._routes.snapshot.queryParamMap.get('cr');
          if (canReturn == '0') {
            this.productForm.disable();
            this.isProductReturn = true;
          }
        },
        error: (err) => {
          this._snackBar.error(err.msg);
        },
      });
    } else {
      this.isInEditMode = false;
    }
  }

  onProductAdd() {
    if (this.productForm.valid) {
      let productObj: Iproduct = {
        ...this.productForm.value,
        pid: Date.now().toString(),
      };
      this._productService.createProduct(productObj).subscribe({
        next: (data) => {
          this._snackBar.success(
            `The product with id ${data.pid} is Added successfully!!!`,
          );
          this.productForm.reset();
          this._productService.setFirstProductSub$.next(true);
          this._router.navigate(['products', productObj.pid], {
            queryParams: {
              cr: productObj.canReturn,
            },
          });
        },
        error: (err) => {
          this._snackBar.error(`Failed to create new product`);
        },
      });
    }
  }

  onProductUpdate() {
    if (this.productForm.valid) {
      let updateObj = { ...this.productForm.value, pid: this.productId };
      console.log(updateObj);
      this._productService.updateProduct(updateObj).subscribe({
        next: (data) => {
          this._snackBar.success(
            `The Product with id ${this.productId} updated Successfully!!!`,
          );
          this._router.navigate(['products', this.productId], {
            queryParams: {
              cr: updateObj.canReturn,
            },
          });
        },
        error: (err) => {
          this._snackBar.error(`Failed to update product`);
        },
      });
    }
  }
}
