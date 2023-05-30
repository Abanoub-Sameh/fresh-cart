import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from 'src/app/products.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  constructor(private _activatedRoute:ActivatedRoute, private _ProductsService:ProductsService , private _CartService:CartService , private _ToastrService :ToastrService ,private _NgxSpinnerService:NgxSpinnerService){}

  text:string='';
  products:any[]=[];
  CategoryDetails:any;
  login:boolean=false;
  categoryId:any
  ifEmpty:boolean=false

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._activatedRoute.paramMap.subscribe((parms)=>{
      this.categoryId=parms.get('id');
    })

    this._ProductsService.getCategoryDetails(this.categoryId).subscribe({
      next:(response)=>{
        this.CategoryDetails=response.data
      }
    })


    this._ProductsService.getProductsWithCategory(this.categoryId).subscribe({
      next:(respons)=>{
        if(respons.results>0){
          this.ifEmpty = true
        }
        else{this.ifEmpty = false}
        this.products =respons.data
        this._NgxSpinnerService.hide()
      }
    })
  }

  addToCart(productId:string):any{
    this._CartService.addToCart(productId).subscribe({
      next:(respons)=>{
        this._ToastrService.success('Product added successfully to your cart','success')
        this._CartService.numberOFCart.next(respons.numOfCartItems)
      },
      error:(err)=>{
        this._ToastrService.error('please login first','sorry')
      }
    })
  }

  isLogin():any{
    if(localStorage.getItem('token') !== null){
      this.login=true
    }
    else{
      this.login=false
    }
    return this.login
  }
}