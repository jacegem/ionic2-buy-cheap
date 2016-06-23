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
    if (value == 'http://i.imgur.com/hLD9hzI.jpg'){
      return args;
    } else if (value){
      return value;
    } else {
      return args;
    }
  }
}
