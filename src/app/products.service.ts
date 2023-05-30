import { Injectable } from '@angular/core';
import{HttpClient} from'@angular/common/http'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) {}

  getProducts():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  getProductsWithCategory(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
  }
  getCategoryDetails(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  
  getBrands():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  getBrandDetails(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
  getProductsWithBarnd(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
  }

}
