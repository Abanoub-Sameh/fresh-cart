import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[], text:string): any[] {
    return products.filter((product)=>product.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
  }

}
