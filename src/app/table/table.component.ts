import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/productService/product.service';
import { PurchaseService } from 'src/app/Services/purchaseService/purchase.service';
import { SalesService } from 'src/app/Services/salesService/sales.service';
import { Observable } from "rxjs";
import { Product } from '../model/product.model';
import { Purchase } from '../model/purchase.model';
import { Sales } from '../model/sales.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  p: any;
  private _allPro: Observable<Product[]>;
  public get allPro(): Observable<Product[]> {
    return this._allPro;
  }

    private _allPur: Observable<Purchase[]>;
    public get allPur(): Observable<Purchase[]> {
      return this._allPur;
  }

  private _allSal: Observable<Sales[]>;
  public get allSal(): Observable<Sales[]> {
    return this._allSal;
  }

  public set allPro(value: Observable<Product[]>) {
    this._allPro = value;
  }
    public set allPur(value: Observable<Purchase[]>) {
      this._allPur = value;
  }
  public set allSal(value: Observable<Sales[]>) {
    this._allSal = value;
  }
  product: Product[] = [];
  purchase: Purchase[] = [];
  sales: Sales[] = [];


  constructor(
     private productservice: ProductService,
     private purchaseService: PurchaseService,
     private salesService: SalesService) {

      }

  loadDisplay(){
    //debugger;
    this.allPro = this.productservice.getproduct();
    this.allPur = this.purchaseService.getpurchase();
    this.allSal = this.salesService.getsales();

  }

  ngOnInit() {

    this.productservice.getproduct().subscribe(data => {
      this.product = data;
      this.loadDisplay();
    })

    this.purchaseService.getpurchase().subscribe(data => {
      this.purchase = data;
      this.loadDisplay();
    })

    this.salesService.getsales().subscribe(data => {
      this.sales = data;
      this.loadDisplay();
    })
  }

  getproduct(){
  }

  getpurchase(){
  }

  getsales(){
  }
}
