import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from 'src/app/model/product.model';
import { SalesService } from 'src/app/Services/salesService/sales.service';
import { ProductService } from 'src/app/Services/productService/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {

  products: Product[] = [];
  model;

  addForm: FormGroup;
  submitted = false;
  isEdit :boolean;

  public dateValue: Date = new Date ("05/27/2021");

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private route : ActivatedRoute,
     private toastr : ToastrService,
      private salesservice: SalesService,
      private productService: ProductService) {
       }


    ngOnInit() {
      let SalesID = this.route.snapshot.paramMap.get('id');
      if(SalesID){
        this.isEdit = true;
        this.salesservice.getsalesById(+SalesID)
        .subscribe(data => {
          this.addForm.setValue(data);
          })
      }
      this.addForm = this.formBuilder.group({
        ProductId:["", Validators.required],
        SalesDate:[""],
        NoOfSales: ["", Validators.required],
        CustomerName:["", Validators.required]
      });

      this.productService.getproduct().subscribe(resp => {
        this.products = resp;
      })
    }

    onSubmit(){
     // debugger;
      this.submitted = true;
      if(this.addForm.invalid){
        return;
      }
      this.salesservice.createsales(this.addForm.value)
      .subscribe(data => {
        this.toastr.success('Successfully added!!');
        this.router.navigate(['list-sales']);
        if(this.addForm.status){
          this.addForm.reset();
        }
      },
        error => {
          alert(error);
        });
    }

}
