import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/navbar/navbar.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GetConfirmComponent } from './component/get-confirm/get-confirm.component';
import { MaterialModule } from './material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryPipe } from './pipes/summary.pipe';
import { MatTableModule } from '@angular/material/table';
import { HomeDashboardComponent } from './component/home-dashboard/home-dashboard.component';
import { UsersDashboardComponent } from './component/users-dashboard/users-dashboard.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { FairsDashboardComponent } from './component/fairs-dashboard/fairs-dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UsersFormComponent } from './component/users-dashboard/users-form/users-form.component';
import { UsersDetailsComponent } from './component/users-dashboard/users-details/users-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    GetConfirmComponent,
    SummaryPipe,
    HomeDashboardComponent,
    UsersDashboardComponent,
    ProductDashboardComponent,
    FairsDashboardComponent,
    PageNotFoundComponent,
    UsersFormComponent,
    UsersDetailsComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
