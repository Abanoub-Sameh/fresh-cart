import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ForgotPasswordsComponent } from './components/forgot-passwords/forgot-passwords.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home'  , component:HomeComponent},
  {path:'allorders', canActivate:[AuthGuard] , component:AllordersComponent},
  {path:'categories', canActivate:[AuthGuard] , component:CategoriesComponent},
  {path:'categoryDetails/:id' , component:CategoryDetailsComponent},
  {path:'brands', canActivate:[AuthGuard] , component:BrandsComponent},
  {path:'brandDetails/:id' , component:BrandDetailsComponent},
  {path:'cart', canActivate:[AuthGuard] , component:CartComponent},
  {path:'setting', canActivate:[AuthGuard] , loadChildren:()=>import('./setting/setting.module').then((x)=>x.SettingModule)},
  {path:'productdetails/:id' , component:ProductdetailsComponent},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'forgotPasswords' , component:ForgotPasswordsComponent},
  {path:'**' , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
