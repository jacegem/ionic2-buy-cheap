import { Component } from '@angular/core';

/*
  Generated class for the Shop component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'shop',
  templateUrl: 'build/components/shop/shop.html'
})
export class Shop {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
