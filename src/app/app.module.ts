import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainSlideComponent } from './components/main-slide/main-slide.component';
import { SearchPipe } from './search.pipe';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptorInterceptor } from './headers-interceptor.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { ForgotPasswordsComponent } from './components/forgot-passwords/forgot-passwords.component';

import {MatMenuModule} from '@angular/material/menu';


import {MatNativeDateModule} from '@angular/material/core';

import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    BrandsComponent,
    CategoriesComponent,
    CartComponent,
    NotFoundComponent,
    ProductdetailsComponent,
    MainSlideComponent,
    SearchPipe,
    FeaturedProductsComponent,
    ForgotPasswordsComponent,
    CategoryDetailsComponent,
    AllordersComponent,
    BrandDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule ,
    NgxSpinnerModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({   // ToastrModule added
      positionClass:'toast-bottom-left',
      progressBar:true,
      timeOut: 3000,
      maxOpened:5,
    }), 
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:HeadersInterceptorInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
