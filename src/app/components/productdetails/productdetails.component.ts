import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  constructor( private _NgxSpinnerService:NgxSpinnerService,  private _activatedRoute:ActivatedRoute , private _ProductsService:ProductsService , private _CartService:CartService , private _ToastrService:ToastrService){ }

  protectedId:any
  protectedDetails:any
  login:boolean=false;

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._activatedRoute.paramMap.subscribe((parms)=>{
    this.protectedId=parms.get('id');
    })
    this._ProductsService.getProductDetails(this.protectedId).subscribe({
      next:(response)=>{
        this.protectedDetails = response.data
        this._NgxSpinnerService.hide()
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
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