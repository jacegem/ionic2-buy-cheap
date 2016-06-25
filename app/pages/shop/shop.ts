import { Component } from '@angular/core';
import { NavController, Platform, Toast } from 'ionic-angular';
import { Firebase } from '../../providers/firebase/firebase';
import { Util } from '../../providers/util/util';
/*
  Generated class for the ShopPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shop/shop.html',
})
export class ShopPage {
  itemList: any = [];  // 아이템 목록;
  itemMap: any = {};
  sitePage: number;     // 실정보 요청시 사용하는 페이지
  pageRow = 50;      // 한번에 보여주는 아이템 수
  path: any;  // 저장하는 공간 주소
  sortValue = 'dateFormat';
  lastItem: any = {};      // 마지막 아이템
  searchText = '';
  lastSearchText = '';

  clienType: any;

  dealbadaUrl: any;
  ppomppuUrl: any;
  clienUrl: any;
  ddanziUrl: any;



  constructor(private nav: NavController
    , private fb: Firebase
    , private util: Util
    , private platform: Platform) {

    var backbutton = 0;
    platform.registerBackButtonAction((event) => {
      if (backbutton == 0) {
        backbutton++;
        let toast = Toast.create({
          message: 'User was added successfully',
          duration: 3000
        });
        this.nav.present(toast);
        // 2초 후 리셋
        setTimeout(function () { backbutton = 0; }, 2000);
      }else{
        platform.exitApp();
      }
    });
  }

  search() {
    if (this.lastSearchText == '' && this.searchText == '') {
      this.util.show();
      return;
    } else {
      this.lastSearchText = this.searchText;
    }


    if (this.searchText == '') {
      for (var i in this.itemList) {
        this.itemList[i].hide = undefined;
      }
    } else {
      for (var i in this.itemList) {
        let n = this.itemList[i].title.toLowerCase().search(this.searchText.toLowerCase());
        if (n != -1) this.itemList[i].hide = undefined;
        else this.itemList[i].hide = true;
      }
    }
    console.log("search");
    this.util.show();
  }


  init() {
    this.sitePage = 1;        // 사이트 페이지   
    this.itemMap = {};
  }

  doRefresh(_refresher) {
    console.log('_refresher', _refresher);
    this.init();
    this.getItems(_refresher);
  }


  doInfinite(_infiniteScroll) {
    // firebase 에서 더 가져온다.
    console.log('_infiniteScroll', _infiniteScroll);
    this.getItemsMore(_infiniteScroll);
  }

  getItemsMore(_infiniteScroll) {
    this.fb.ref(this.path).orderByChild(this.sortValue).endAt(this.lastItem.dateFormat).limitToLast(this.pageRow).once('value', (snapshot) => {
      let items = snapshot.val();
      items = this.util.sortObjReverse(items);
      this.lastItem = items[items.length - 1];

      for (var key in items) {
        let item = items[key];
        // 목록에 없으면, 추가하고 리스트 소팅
        if (this.itemMap[item.url]) continue;
        this.itemList.push(item);
        this.itemMap[item.url] = 1;
      }

      this.search();
      if (_infiniteScroll) _infiniteScroll.complete();
      this.getRealData();
    });
  }

  // 링크 페이지를 연다.
  openLink(item) {
    this.platform.ready().then(() => {
      window.open(item.url, '_blank');
    });
  }

  getItems(_event) {
    this.fb.ref(this.path).orderByChild(this.sortValue).limitToLast(this.pageRow).once('value'
      , (snapshot) => {
        let items = snapshot.val();

        items = this.util.sortObjReverse(items);
        this.lastItem = items[items.length - 1];

        this.itemList = [];

        for (var key in items) {
          let item = items[key];
          this.itemList.push(item);
          this.itemMap[item.url] = 1;
        }
        //this.util.show();
        this.search();
        if (_event) _event.complete();
        setTimeout(this.getRealData(), 1000);
      }, (error) => {
        console.log("ERROR:", error)
      });
  }

  saveItem(_item) {
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

    if (!added) {
      if (this.lastItem && this.lastItem.dateFormat > item.dateFormat) return;
      this.itemList.push(item);
      this.itemList = this.util.sortListReverse(this.itemList);
      this.search();
      //this.util.show();
    }
  }

  getRealData() {
    this.util.loadDealbada(this.dealbadaUrl, this.sitePage).subscribe((item) => {
      this.saveItem(item);
    });
    this.util.loadPpomppu(this.ppomppuUrl, this.sitePage).subscribe((item) => {
      this.saveItem(item);
    });
    this.util.loadClien(this.clienUrl, this.sitePage, this.clienType).subscribe((item) => {
      this.saveItem(item);
    });
    this.util.loadDdanzi(this.ddanziUrl, this.sitePage).subscribe((item) => {
      this.saveItem(item);
    });

    this.sitePage++;
  }
}
