import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { MovedetailPage } from '../../pages/movedetail/movedetail';
/*
  Generated class for the Move page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-move',
  templateUrl: 'move.html'
})
export class MovePage {

    moves: FirebaseListObservable<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
        this.moves = af.database.list('/moves');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovePage');
  }
  goToMoveDetail(move: any) {
      this.navCtrl.push(MovedetailPage, move);
  }
}
