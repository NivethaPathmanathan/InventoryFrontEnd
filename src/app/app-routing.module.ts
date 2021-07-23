import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ListProductComponent } from './Product/list-product/list-product.component';
import { AddPurchaseComponent } from './Purchase/add-purchase/add-purchase.component';
import { ListPurchaseComponent } from './Purchase/list-purchase/list-purchase.component';
import { AddSalesComponent } from './Sales/add-sales/add-sales.component';
import { ListSalesComponent } from './Sales/list-sales/list-sales.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: "add-product", component: AddProductComponent},
  { path: "add-product/:id", component: AddProductComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: "add-purchase", component: AddPurchaseComponent },
  { path: "add-purchase/:id", component: AddPurchaseComponent },
  { path: 'list-purchase', component: ListPurchaseComponent },
  { path: "add-sales", component: AddSalesComponent },
  { path: "add-sales/:id", component: AddSalesComponent },
  { path: 'list-sales', component: ListSalesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'table', component : TableComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
