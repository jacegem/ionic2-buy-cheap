import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Firebase} from './providers/firebase/firebase';
import { Util } from './providers/util/util';
import {GlobalConfig} from './providers/global-config/global-config';


declare var globalConfig: any;
declare var AdMob: any;

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform
    , firebase: Firebase
    , globalConfig: GlobalConfig) {
    this.rootPage = TabsPage;

    // Initialize Firebase
    firebase.initializeApp();


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      var backbutton = 0;
      platform.registerBackButtonAction((event) => {
        if (backbutton == 0) {
          backbutton++;
          let toast = Toast.create({
            message: 'User was added successfully',
            duration: 3000
          });
          this.nav.present(toast);
        }
      });

      if (/(android)/i.test(navigator.userAgent)) {
        if (AdMob) {
          AdMob.createBanner(
            {
              adId: globalConfig.getAdMobBannerId(),
              position: AdMob.AD_POSITION.BOTTOM_CENTER,
              autoShow: true
            }
          );
        }
      }
    });
  }
}

// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/


// tabbarPlacement: 'bottom'은 탭의 위치를 아래로 내린다. 안드로이드의 경우 기본 탭의 위치가 상단으로 되어 있다. 
ionicBootstrap(MyApp, [Firebase, GlobalConfig, Util], {
  tabbarPlacement: 'bottom'
})
