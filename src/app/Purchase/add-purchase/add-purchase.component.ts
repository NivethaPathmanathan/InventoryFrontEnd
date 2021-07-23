import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/Services/productService/product.service';
import { PurchaseService } from 'src/app/Services/purchaseService/purchase.service';
import { Purchase } from 'src/app/model/purchase.model';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  products: Product[] = [];
  purchase: Purchase;
  addForm: FormGroup;
  submitted = false;
  isEdit :boolean;
  disableSelect = true;
  //model;

  //public dateValue: Date = new Date ("05/27/2021");
 // selected;
  //: {startdDate: Moment, endDate: Moment};

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr : ToastrService,
    private purchaseservice: PurchaseService) {

  }


  ngOnInit() {
    let PurchaseId = this.route.snapshot.paramMap.get('id');
    if(PurchaseId){
      this.isEdit = true;
      this.purchaseservice.getpurchaseById(+PurchaseId)
      .subscribe(data => {
        this.addForm.setValue(data);
        })
    }
    this.addForm = this.formBuilder.group({
      ProductId: ["", Validators.required],
      PurchaseDate: [new Date(), Validators.required],
      NoReceived: ["", Validators.required, Validators.pattern("[0-9]*")],
      SupplierName: [""]
    });

    this.productService.getproduct().subscribe(resp => {
      this.products = resp;
    })

  }

  get f(){
    return this.addForm.controls
  }

  onSubmit(){
    //debugger;
    this.submitted = true;
       if(this.addForm.invalid){
       return;
     }
    let ProductId = this.route.snapshot.paramMap.get('id');
    if(ProductId){
      this.isEdit = true;
     this.purchaseservice.updatepurchase(this.addForm.value)
     .pipe(first())
     .subscribe(
       data => {
         this.toastr.success('Successfully updated!!');
         this.router.navigate(['list-purchase']);
         this.addForm.reset();
       },
       error => {
         alert(error);
       });
    }else{

     // if(this.addForm.invalid){
     //   return;
     // }

     this.purchaseservice.createpurchase(this.addForm.value)
     .subscribe(data => {
       this.toastr.success('Successfully added!!');
       this.router.navigate(['list-purchase']);
       if(this.addForm.status){
         this.addForm.reset();
       }
     },
       error => {
         alert(error);
       });
   }
 }


}
