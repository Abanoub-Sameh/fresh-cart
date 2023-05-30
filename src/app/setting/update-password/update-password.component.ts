import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormGroup,FormControl ,Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  constructor(private _authService:AuthService,public dialog: MatDialog){  }

  isLoading:boolean=false;
  errorMsg:string='';

  formUpdatePass:FormGroup= new FormGroup({
    currentPassword:new FormControl(null,[Validators.required ]), 
    password:new FormControl(null,[Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
  },{validators : this.repasswordMatching} );

  
  repasswordMatching(formUpdatePass:any){
    let password = formUpdatePass.get('password')
    let rePassword = formUpdatePass.get('rePassword')
    if(password?.value === rePassword?.value){
      return null;
    }
    else{
      rePassword?.setErrors({passwordmatch : 'repassword is not matched'})
      return {passwordmatch : 'repassword is not matched'};
    }
  }

  updatePassword(formUpdatePass:FormGroup):void{
    this.isLoading=true;
    this.errorMsg='';
    
    if(formUpdatePass.valid){
      this._authService.updatePassword(formUpdatePass.value).subscribe({
        next:(response)=> {          
            this.isLoading=false
            this.dialog.open(DialogElementsExampleDialog , {
              width:'65%',
              enterAnimationDuration:200,
              exitAnimationDuration:100,
              closeOnNavigation:true,
            });
            setTimeout(()=>{
              this.dialog.closeAll()
              this._authService.signout();
            },7000)
          
        },
        error:(err)=> {
          this.isLoading=false
          this.errorMsg=err.error.errors.msg
          }
      })
    }    
  }

  signout(){
    this._authService.signout()
  }
}


//dialog Component
  @Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: './dialog-elements-example-dialog.html',
  })
  export class DialogElementsExampleDialog {
    constructor(private _authService:AuthService,public dialog: MatDialog){  }
    signout(){
      this.dialog.closeAll()
    this._authService.signout()
  }
  }

