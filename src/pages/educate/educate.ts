import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {AngularFireAuth} from "angularfire2/auth";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireAuth) {
        this.af = af;
        this.logoutUser();

        this.navCtrl.push(LoginPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducatePage');
  }

    logoutUser(): Promise<any> {
        return this.af.auth.signOut();
    }
}
