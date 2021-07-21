import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/productService/product.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;
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
      Quantity:[""]
    })

  }

  onSubmit(){
   //debugger;
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
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
