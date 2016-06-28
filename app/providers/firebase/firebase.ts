import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalConfig} from '../global-config/global-config';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var firebase: any;

@Injectable()
export class Firebase {
  data: any;

  constructor(private http: Http
    , private globalConfig: GlobalConfig) {
    this.data = null;
  }

  initializeApp() {
    firebase.initializeApp(this.globalConfig.getFirebase());
  }

  ref(_path) {
    if (!firebase || !firebase.database()) this.initializeApp();
    return firebase.database().ref(_path);
  }

  refOnce(_path, _sortValue, _dateFormat, _pageRow) {
    return new Observable(observer => {
      firebase.database().ref(_path).orderByChild(_sortValue).endAt(_dateFormat).limitToLast(_pageRow).once('value',
        (snapshot) => {
          let items = snapshot.val();
          debugger;
          observer.next(items);
        }, (error) => {

        });
    });
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

