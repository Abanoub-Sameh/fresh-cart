import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';
AuthService

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService:CartService , private _AuthService:AuthService){}

  userID:any
  orders:any

  ngOnInit():void{
    this.userID =this._AuthService.userData.getValue()   

    this._CartService.getAllOrders(this.userID.id).subscribe({
      next:(res)=>{
        this.orders=res
      }
    })
  }
}
