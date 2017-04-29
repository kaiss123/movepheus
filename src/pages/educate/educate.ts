import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

import { LoginPage } from '../login/login';
/*
  Generated class for the Educate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-educate',
  templateUrl: 'educate.html'
})
export class EducatePage {
    af: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
        this.af = af;
        this.logoutUser();

        this.navCtrl.push(LoginPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducatePage');
  }
    logoutUser(): firebase.Promise<any> {
        return this.af.auth.logout();
    }
}
