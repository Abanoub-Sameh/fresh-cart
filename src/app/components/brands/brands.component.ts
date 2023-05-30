import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService, private _NgxSpinnerService:NgxSpinnerService){}

  brands:any;

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._ProductsService.getBrands().subscribe({
      next:(response)=>{
        this.brands =response.data;
        this._NgxSpinnerService.hide()
      }
    })
    }
}