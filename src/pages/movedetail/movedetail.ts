import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Movedetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-movedetail',
  templateUrl: 'movedetail.html'
})
export class MovedetailPage {

    move: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.move = this.navParams.data;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovedetailPage');
  }

}
