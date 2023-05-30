import { Component } from '@angular/core';
import { FormGroup,FormControl ,Validators} from "@angular/forms";
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _authService:AuthService , private _router:Router ) {
    if(localStorage.getItem('token') !== null){
      this._router.navigate(['/home'])
    }

  }

  isLoading:boolean=false;
  errorMsg:string='';

  formRegister:FormGroup= new FormGroup({
    name:new FormControl(null ,[Validators.required , Validators.maxLength(20) ,Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required , Validators.email]), 
    password:new FormControl(null,[Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2|5]{1}[0-9]{8}$/)]),
  },{validators : this.repasswordMatching} );

  repasswordMatching(formRegister:any){
    let password = formRegister.get('password')
    let rePassword = formRegister.get('rePassword')
    if(password?.value === rePassword?.value){
      return null;
    }
    else{
      rePassword?.setErrors({passwordmatch : 'repassword is not matched'})
      return {passwordmatch : 'repassword is not matched'};
    }
  }

  handelRegister(formdata:FormGroup):void{
    this.isLoading=true;
    this.errorMsg='';
    
    if(formdata.valid){
      this._authService.register(formdata.value).subscribe({
        next:(response)=> {
          if(response.message === 'success'){
            this.isLoading=false
            this._router.navigate(['/login'])
          }
        },
        error:(err)=> {
          this.isLoading=false
          if(err.error.errors == undefined){
              this.errorMsg=err.error.message
          }
          else{this.errorMsg=err.error.errors.msg}
          }
      })
    }    
  }
}