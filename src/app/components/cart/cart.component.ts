import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor( private _NgxSpinnerService:NgxSpinnerService, private _CartService:CartService , private _ToastrService:ToastrService ){  }

  clickSetTimeOut:any
  cartDetails:any = null

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._CartService.GetLoggedUserCart().subscribe({
      next:(response)=>{
        this.cartDetails=response.data
        this._NgxSpinnerService.hide()
      },
      error:(err)=>{
        this._NgxSpinnerService.hide()
      }
    })
  }

  removeItem(productId:any){
    this._NgxSpinnerService.show()
    this._CartService.removeCartItem(productId).subscribe({
      next:(response)=>{
        this._NgxSpinnerService.hide()
        this._CartService.numberOFCart.next(response.numOfCartItems)
        this._ToastrService.warning("item removed from cart",'removed')
        this.cartDetails=response.data
        console.log(response);
        
      },
      error:(err)=>console.log(err)
    })
  }
  updateItemCount(productId:string , count:number){
    clearTimeout(this.clickSetTimeOut)
    this.clickSetTimeOut=setTimeout(()=>{

          this._CartService.updateItemCount(productId,count).subscribe({
          next:(response)=>{
          this.cartDetails=response.data
          },
      })
    },500
    )
  }

  deleteCart(){
    this._NgxSpinnerService.show()
    this._CartService.deleteCart().subscribe({
      next:(response)=>{
        this._NgxSpinnerService.hide()
        this._CartService.numberOFCart.next(0)
        this.cartDetails=response.data
        },
        error:(err)=>{
          this._NgxSpinnerService.hide()
        }
    })  
  }

  //pay part
  shippingAddress:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)
  })
  handlepayment(shippingAddress:FormGroup , cartId:any){
    this._CartService.onlinePayment(shippingAddress.value , cartId).subscribe({
      next:(res)=>{
        window.location.href = res.session.url
      }
    })
  }
  }


