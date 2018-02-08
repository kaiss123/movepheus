import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


import {MovedetailPage} from '../../pages/movedetail/movedetail';
import {AngularFireDatabase} from "angularfire2/database";

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

    moves: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase) {
        this.moves = af.list('moves').valueChanges();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovePage');
  }
  goToMoveDetail(move: any) {
      this.navCtrl.push(MovedetailPage, move);
  }
}
