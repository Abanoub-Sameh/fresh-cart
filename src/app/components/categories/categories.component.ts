import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor ( private _ProductsService:ProductsService){  }

  isDragging:any
  categories:any;
  
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next:(response)=>{
        this.categories =response.data;
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin:20,
    mergeFit:true,
    autoplay:true,
    URLhashListener:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
