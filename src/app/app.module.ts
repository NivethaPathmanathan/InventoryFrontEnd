import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ListProductComponent } from './Product/list-product/list-product.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductService } from './Services/productService/product.service';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserPipe } from './pipe/user.pipe';
import { AddSalesComponent } from './Sales/add-sales/add-sales.component';
import { ListSalesComponent } from './Sales/list-sales/list-sales.component';
import { AddPurchaseComponent } from './Purchase/add-purchase/add-purchase.component';
import { ListPurchaseComponent } from './Purchase/list-purchase/list-purchase.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TableComponent } from './table/table.component';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductComponent,
    UserPipe,
    AddSalesComponent,
    ListSalesComponent,
    AddPurchaseComponent,
    ListPurchaseComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot({
      positionClass : 'toast-bottom-right'
    })
  ],
  providers: [ProductService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
