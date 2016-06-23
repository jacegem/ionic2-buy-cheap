import {Component} from '@angular/core'
import {NavParams} from 'ionic-angular';

import {ShopKoreaPage} from '../shop-korea/shop-korea';
import {ShopOverseasPage} from '../shop-overseas/shop-overseas';

// import {HomePage} from '../home/home';
// import {AboutPage} from '../about/about';
// import {ContactPage} from '../contact/contact';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  shopKorea: any = ShopKoreaPage;;
  shopOverseas: any = ShopOverseasPage;
  mySelectedIndex: number;
  // tab1Root: any;
  // tab2Root: any;
  // tab3Root: any;


  constructor(navParams: NavParams) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
