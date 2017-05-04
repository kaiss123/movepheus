import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';
import * as moment from 'moment';
import { RRule } from 'rrule';

/*
  Generated class for the AddMoveEventModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-move-event-modal',
  templateUrl: 'add-move-event-modal.html'
})
export class AddMoveEventModalPage {

    moves: any;
    intervals: any = [2,3,5,10,15,30,45,60,90,120];
    count: any;
    freqs: any;
    reminders: any;
    name: any = 'new name';
    selectedReminder: any;
    selectedMove: any;
    selectedInterval: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public alertCtrl: AlertController, public platform: Platform) {
        this.moves = navParams.get('moves');
        this.reminders = navParams.get('reminders');
        console.log(this.moves);
        console.log(this.reminders);
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoveEventModalPage');
  }
  closeModal(hasdata): void {
      let data = {
          'reminder': this.selectedReminder,
          'move': this.selectedMove,
          'interval': this.selectedInterval

      };
      if (hasdata) {
          this.viewCtrl.dismiss(data);
      } else {
          this.viewCtrl.dismiss();
      }
  }
  addMoveEvent() {
      console.dir(this.selectedReminder);
      console.dir(this.selectedMove);
      console.dir(this.selectedInterval);
      this.closeModal(true);
  }
}
