import { Component } from '@angular/core';
import { FormGroup,FormControl ,Validators} from "@angular/forms";
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _authService:AuthService , private _router:Router ) {
    if(localStorage.getItem('token') !== null){
      this._router.navigate(['/home'])
    }

  }

  isLoading:boolean=false;
  errorMsg:string='';

  formLogin:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required , Validators.email]), 
    password:new FormControl(null,[Validators.required ]),
  });

  handelLogin(formdata:FormGroup):void{
    this.isLoading=true;
    this.errorMsg='';

    if(formdata.valid){
      this._authService.login(formdata.value).subscribe({
        next:(response)=> {          
          if(response.message === 'success'){
            this.isLoading=false
            localStorage.setItem('token',response.token)
            this._authService.decodeUserData()
            this._router.navigate(['/home'])            
          }
        },
        error:(err)=> {          
          this.isLoading=false
          this.errorMsg="Incorrect email or password "
          }
      })
    }    
  }
}
