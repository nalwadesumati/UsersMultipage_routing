import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeDashboardComponent } from './component/home-dashboard/home-dashboard.component';
import { UsersDashboardComponent } from './component/users-dashboard/users-dashboard.component';
import { UsersFormComponent } from './component/users-dashboard/users-form/users-form.component';
import { UsersDetailsComponent } from './component/users-dashboard/users-details/users-details.component';
import { ProductDashboardComponent } from './component/product-dashboard/product-dashboard.component';
import { FairsDashboardComponent } from './component/fairs-dashboard/fairs-dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProductFormComponent } from './component/product-dashboard/product-form/product-form.component';
import { ProductDetailsComponent } from './component/product-dashboard/product-details/product-details.component';

// const routes: Routes = [
//   { path: 'post-dashboard', component: PostDashboardComponent },
//   { path: 'post', component: PostDashboardComponent },
//   { path: 'post/addPost', component: PostFormComponent },
//   { path: 'post/:id', component: PostComponent },

//   { path: 'post/:id/edit', component: PostFormComponent },
//   { path: '', redirectTo: 'post-dashboard', pathMatch: 'full' },
// ];

const appRoutes: Routes = [
  { path: '', component: HomeDashboardComponent },
  {
    path: 'Home',
    component: HomeDashboardComponent,
  },
  {
    path: 'users',
    component: UsersDashboardComponent,
    children: [
      {
        path: 'adduser',
        component: UsersFormComponent,
      },
      {
        path: ':userId',
        component: UsersDetailsComponent,
      },
      {
        path: ':userId/edit',
        component: UsersFormComponent,
      },
    ],
  },

  {
    path: 'products',
    component: ProductDashboardComponent,
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent,
      },
      {
        path: ':pid',
        component: ProductDetailsComponent,
      },
      {
        path: ':pid/edit',
        component: ProductFormComponent,
      },
    ],
  },

  {
    path: 'fairs',
    component: FairsDashboardComponent,
  },

  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
