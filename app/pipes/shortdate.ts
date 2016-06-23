import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Shortdate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'shortdate'
})
@Injectable()
export class Shortdate {
  /*
    Takes a value and makes it lowercase.
   */
  

  transform(value, args) {    
    return value.substring(5,16);    
  }
}
