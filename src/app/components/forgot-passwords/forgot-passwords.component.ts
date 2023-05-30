import { Component } from '@angular/core';
import { FormGroup,FormControl ,Validators} from "@angular/forms";
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-forgot-passwords',
  templateUrl: './forgot-passwords.component.html',
  styleUrls: ['./forgot-passwords.component.css']
})
export class ForgotPasswordsComponent {
  constructor( private _authService:AuthService , private _router:Router , private _ToastrService:ToastrService ) {

    if(localStorage.getItem('token') !== null){
      this._router.navigate(['/home'])
    }
  }

  hideEmail:boolean=false
  errorEmail:boolean=false
  hideCode:boolean=false
  errorcode:boolean=false
  reset:boolean=false
  isLoading:boolean=false;
  msg:string=''

  forgotPasswords:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required , Validators.email])
  });

  resetCode:FormGroup= new FormGroup({
    resetCode:new FormControl(null,[Validators.required])
  });

  resetPass:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required , Validators.email]),
    newPassword:new FormControl(null,[Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  })

  forgotPassword(emailUser:FormGroup){
    this.msg=''
    this.isLoading=true
    this.errorEmail=false
    this._authService.forgotPasswords(emailUser.value).subscribe({
      next:(res)=>{
        this.msg=res.message
        this.isLoading=false
        this.hideEmail=true
        this.hideCode=true
      },
      error:(err)=>{
        this.isLoading=false
        this.errorEmail=true
      }
    })
  }


  verifyResetCode(resetCode:FormGroup){
    this.msg=''
    this.isLoading=true
    this.errorcode=false
    
    this._authService.verifyResetCode(resetCode.value).subscribe({
      next:(res)=>{
        this.isLoading=false
        this.hideCode=false
        this.reset=true
      },
      error:(err)=>{
        this.isLoading=false
        this.errorcode=true
      }
    })
  }


  resetPassword(resetPass:FormGroup){
    this.msg=''
    this.isLoading=true
    
    this._authService.resetPassword(resetPass.value).subscribe({
      next:(res)=>{
        this.isLoading=false
        this._ToastrService.success('the password reset successfully' , 'success' ,{positionClass:'toast-center-center' , timeOut:5000} )
        this._router.navigate(['/login'])
        this._ToastrService.success('the password reset successfully' , 'success' ,{positionClass:'toast-center-center'})
      },
      error:(err)=>{
        this.isLoading=false
        this.msg= err.error.message
      }
    })
  }
}