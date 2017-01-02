import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Shortdate } from '../../pipes/shortdate'
import { Default } from '../../pipes/default'
import { Firebase } from '../../providers/firebase/firebase';
import { Util } from '../../providers/util/util';
import { ShopPage } from '../shop/shop';

/*
  Generated class for the ShopOverseasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shop-overseas/shop-overseas.html'
  , pipes: [[Shortdate], [Default]]
})
export class ShopOverseasPage extends ShopPage {
  itemList: any = [];  // 아이템 목록;
  itemMap: any = {};
  sitePage: number;     // 실정보 요청시 사용하는 페이지
  lastItem: any = {};      // 마지막 아이템

  path = 'buy-cheap/shop-overseas';  // 저장하는 공간 주소
  clienType = 'overseas';

  dealbadaUrl = "http://www.dealbada.com/bbs/board.php?bo_table=deal_oversea&page=";
  ppomppuUrl = "http://m.ppomppu.co.kr/new/bbs_list.php?id=ppomppu4&page=";
  clienUrl = "http://m.clien.net/cs3/board?bo_style=lists&bo_table=jirum&spt=&page=";
  ddanziUrl = "http://www.ddanzi.com/index.php?mid=pumpout&m=1&page=";

  constructor(nav: NavController
    , fb: Firebase
    , util: Util
    , platform: Platform) {      
    super(nav, fb, util, platform);
    this.init();
    this.getItems(null);
  }

}