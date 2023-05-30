import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http'
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberOFCart=new BehaviorSubject(0)
  hash:any=`#`

  constructor(private _HttpClient:HttpClient) { 

    if(localStorage.getItem('token') !== null){
      this.GetLoggedUserCart().subscribe({
      next:(response)=>{
      this.numberOFCart.next(response.numOfCartItems)
      },
      error:(err)=>{console.log(err);
      }
    })
    }

  }



  
  addToCart(productId:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    {productId:productId},

  )}
  GetLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , 
  )}
  removeCartItem(productId:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
  )}
  deleteCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 
  )}
  updateItemCount(productId:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
    {count:count},
  )}
  onlinePayment(shippingAddress:any, cartId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://abanoub-sameh.github.io/fresh-cart/${this.hash}/` , 
    {shippingAddress:shippingAddress},
  )}
  getAllOrders(userId:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}` , 
  )}
}
