import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/productService/product.service';
import { Product } from 'src/app/model/product.model';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addForm: FormGroup;
  submitted : boolean;
  isEdit : boolean;
  product: Product;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private toastr :ToastrService,
      private productservice: ProductService) {
      }

  ngOnInit() {
    let ProductID = this.route.snapshot.paramMap.get('id');
    if(ProductID){
      this.isEdit = true;
      this.productservice.getproductById(+ProductID)
    .subscribe(data => {
    this.addForm.setValue(data);
    })
    }

    this.addForm = this.formBuilder.group({
      ProductId: [""],
      ProductName:["", Validators.required],
      BrandName: ["", Validators.required],
      Label:["", Validators.required],
      Quantity:["", Validators.pattern("[0-9]*")]
    })

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
    this.productservice.updateproduct(this.addForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.toastr.success('Successfully updated!!');
        this.router.navigate(['list-product']);
        this.addForm.reset();
      },
      error => {
        alert(error);
      });
   }else{

    // if(this.addForm.invalid){
    //   return;
    // }

    this.productservice.createproduct(this.addForm.value)
    .subscribe(data => {
      this.toastr.success('Successfully added!!');
      this.router.navigate(['list-product']);
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
