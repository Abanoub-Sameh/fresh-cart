import { Injectable } from '@angular/core';
import{HttpClient} from'@angular/common/http'
import { Observable, BehaviorSubject} from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _router:Router ) { 

    if(localStorage.getItem('token') !== null){
      this.decodeUserData();
    }
  }

  userData=new BehaviorSubject(null);

  decodeUserData():void{
    let decodedToken:any = jwtDecode(JSON.stringify( localStorage.getItem('token')))
    
    this.userData.next(decodedToken)  ;
    
  }



  signout():void{
    this.userData.next(null)
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  register(userData:object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' ,userData )
  }
  login(userData:object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' ,userData )
  }
  forgotPasswords(userData:object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' ,userData )
  }
  verifyResetCode(userData:object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' ,userData )
  }
  resetPassword(userData:object):Observable<any>{
  return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' ,userData )
  }
  updatePassword(userData:object):Observable<any>{
  return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword' ,userData )
  }
  updateUserData(userData:object):Observable<any>{
  return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/updateMe' ,userData )
  }

  
}
