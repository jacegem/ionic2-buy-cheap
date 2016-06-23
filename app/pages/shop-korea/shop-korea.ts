import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shortdate } from '../../pipes/shortdate'
import { Default } from '../../pipes/default'

/*
  Generated class for the ShopKoreaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shop-korea/shop-korea.html',
  pipes: [[Shortdate], [Default]],
})
export class ShopKoreaPage {

  itemList:any[] = [];

  constructor(private nav: NavController) {}
}
