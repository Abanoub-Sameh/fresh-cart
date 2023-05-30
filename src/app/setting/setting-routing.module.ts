import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {path:'',redirectTo:'updateData' , pathMatch:'full'},
  {path:'updateData', component:UpdateDataComponent},
  {path:'updatePassword', component:UpdatePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
