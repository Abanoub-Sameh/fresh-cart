import { Component } from '@angular/core';
import { FormGroup,FormControl ,Validators} from "@angular/forms";
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent {
  constructor(private _authService:AuthService , private _router:Router , public dialog: MatDialog) {  }

  isLoading:boolean=false;
  errorMsg:string='';

  formUpdateUserData:FormGroup= new FormGroup({
    name:new FormControl(null ,[Validators.required , Validators.maxLength(20) ,Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required , Validators.email]), 
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2|5]{1}[0-9]{8}$/)]),
  });

  updateUpdateUserData(formUpdateUserData:FormGroup):void{
    this.isLoading=true;
    this.errorMsg='';
    
    if(formUpdateUserData.valid){
      this._authService.updateUserData(formUpdateUserData.value).subscribe({
        next:(response)=> {
          formUpdateUserData.reset()
            this.isLoading=false
            this.dialog.open(DialogElementsExampleDialog , {
              width:'65%',
              enterAnimationDuration:200,
              exitAnimationDuration:100,
              closeOnNavigation:true,
            });
        },
        error:(err)=> {
          this.isLoading=false;
          if(err.error.errors == undefined){
            this.errorMsg=err.error.message
          }
          else{this.errorMsg=err.error.errors.msg}
          }
      })
    }    
  }
}

//dialog Component
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-data-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor(private _authService:AuthService,public dialog: MatDialog , private _router:Router){  }
  close(){
    this.dialog.closeAll()
  }
  goHome(){
    this.dialog.closeAll()
    this._router.navigate(['/home'])
  }
}