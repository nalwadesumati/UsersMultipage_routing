import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Iproduct } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  productObj!: Iproduct;
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductService,
    private _matDialog: MatDialog,
    private _snackBar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getProductByRoute();
  }

  getProductByRoute(): void {
    this._routes.params
      .pipe(
        switchMap((params: Params) => {
          this.productId = params['pid'];
          return this._productService.fetchProductById(this.productId);
        }),
      )
      .subscribe({
        next: (data: Iproduct) => {
          this.productObj = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onRemoveProduct() {
    let matConfig = new MatDialogConfig();
    matConfig.data = `Are you sure you want to remove product with id ${this.productId}`;

    matConfig.disableClose = true;
    this._matDialog
      .open(GetConfirmComponent, matConfig)
      .afterClosed()
      .pipe(
        filter((res) => res),
        switchMap(() => this._productService.removeProduct(this.productId)),
      )
      .subscribe({
        next: (data) => {
          this._snackBar.success(
            `The product with id ${this.productId} removed Successfully!!`,
          );
          this._productService.setFirstProductSub$.next(true);
          this._router.navigate(['products']);
        },
        error: (err) => {
          this._snackBar.error(`Failed to remove product`);
        },
      });
  }

  onProductEdit() {
    this._router.navigate(['edit'], {
      relativeTo: this._routes,
      queryParamsHandling: 'preserve',
    });
  }
}
