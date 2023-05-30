import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from 'src/app/products.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";




@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

  constructor(private _ProductsService:ProductsService , private _CartService:CartService , private _ToastrService :ToastrService ,private _NgxSpinnerService:NgxSpinnerService){}

  text:string='';
  products:any[]=[];
  login:boolean=false;

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._ProductsService.getProducts().subscribe({
      next:(respons)=>{
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
        this._ToastrService.error('please login first ♥','sorry')
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
