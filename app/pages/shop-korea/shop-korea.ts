import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shortdate } from '../../pipes/shortdate'
import { Default } from '../../pipes/default'
import { Firebase } from '../../providers/firebase/firebase';
import { Util } from '../../providers/util/util';
/*
  Generated class for the ShopKoreaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shop-korea/shop-korea.html'
  , pipes: [[Shortdate], [Default]]
})
export class ShopKoreaPage{

  itemList: any = [];  // 아이템 목록;
  itemMap: any = {};
  sitePage: number;     // 실정보 요청시 사용하는 페이지
  pageRow = 50;      // 한번에 보여주는 아이템 수
  path = '2016/site-moa/shop-korea';  // 저장하는 공간 주소
  sortValue = 'dateFormat';
  lastItem: any = {};      // 마지막 아이템

  dealbadaUrl = "http://www.dealbada.com/bbs/board.php?bo_table=deal_domestic&page=";

  constructor(private nav: NavController
    , private fb: Firebase
    , public util: Util) {
    this.init();
    this.getItems(null);
  }

  init() {
    this.sitePage = 1;        // 사이트 페이지   
    this.itemMap = {};
  }

  getItems(_event) {
    // this.fb.refOnce(this.path, this.sortValue, this.lastItem.dateFormat, this.pageRow).subscribe((data)=>{
    //   debugger
    // });

    this.fb.ref(this.path).orderByChild(this.sortValue).limitToLast(this.pageRow).once('value'
      , (snapshot) => {
        let items = snapshot.val();

        items = this.util.sortObjReverse(items);
        this.lastItem = items[items.length - 1];

        for (var key in items) {
          let item = items[key];
          this.itemList.push(item);
          this.itemMap[item.url] = 1;
        }
        this.util.show();
        if (_event) _event.complete();
        this.getRealData();        
      }, (error) => {
        console.log("ERROR:", error)
      });
  }

  saveItem(_item){
    // firebase 에 저장
    let item: any = {};
    if (_item.price) item.price = _item.price;
    if (_item.good) item.good = _item.good;
    if (_item.bad) item.bad = _item.bad;
    if (_item.reply) item.reply = _item.reply;
    if (_item.read) item.read = _item.read;
    if (_item.title) item.title = _item.title;
    if (_item.soldOut) item.soldOut = _item.soldOut;
    if (_item.imgSrc) item.imgSrc = _item.imgSrc;
    if (_item.url) item.url = _item.url;
    if (_item.dateFormat) item.dateFormat = _item.dateFormat;

    let key = this.util.getKeyFromUrl(item.url);
    this.fb.ref(this.path + '/' + key).set(item);

    // 목록에 없으면, 추가하고 리스트 소팅
    let added = this.itemMap[item.url];

    if (!added && this.lastItem.dateFormat < item.dateFormat){
      this.itemList.push(item);
      this.itemList = this.util.sortListReverse(this.itemList);
      this.util.show();
    }
  }

  getRealData() {
    //this.util.loadDealbada(this.saveItem, this, this.dealbadaUrl, this.sitePage);
    this.util.loadDealbada(this.dealbadaUrl, this.sitePage).subscribe((item) => {
      this.saveItem(item);
    });
    // this.loadPpomppu(this.saveData, this.ppomppuUrl, this.sitePage);
    // this.loadClien(this.sitePage);
    // this.loadDdanzi(this.sitePage);
    this.sitePage++;
  }
}
