import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

    numberOFCart:number=0
    isLogin:boolean=false;

  constructor(private _AuthService:AuthService , private _router:Router , private _CartService:CartService){
    _CartService.numberOFCart.subscribe({
      next:(res)=>{
        this.numberOFCart=res
      }
    })

    _AuthService.userData.subscribe({
      next:()=>{
        if(_AuthService.userData.getValue()!==null){
          this.isLogin=true;
        }
        else{this.isLogin=false}
      }
    })
}

  signout():void{
    this._AuthService.signout()
  }
}