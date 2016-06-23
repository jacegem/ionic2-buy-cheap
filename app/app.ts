import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';


declare var globalConfig: any;
declare var firebase: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;
    
    // Initialize Firebase
    firebase.initializeApp(globalConfig.firebase);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

// 두번째 파라미터에는 providers 를 입력한다.
ionicBootstrap(MyApp, [firebase], {
  tabbarPlacement: 'bottom'
})
