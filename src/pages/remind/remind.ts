import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AddReminderModalPage } from '../add-reminder-modal/add-reminder-modal';
import { RRule } from 'rrule';
import { LocalNotifications } from 'ionic-native';
/*
  Generated class for the Remind page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-remind',
  templateUrl: 'remind.html'
})
export class RemindPage {
   reminders: FirebaseListObservable<any>;
   moves: FirebaseListObservable<any>;
   modalCtrl: ModalController;
   dates: string[];

   constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, modalCtrl: ModalController) {
       this.reminders = af.database.list('/reminders');
       this.modalCtrl = modalCtrl;

   }

  ionViewDidLoad() {
      console.log('ionViewDidLoad RemindPage');
      let rule = new RRule({
          freq: RRule.WEEKLY,
          interval: 5,
          byweekday: [RRule.MO, RRule.FR],
          dtstart: new Date(2012, 1, 1, 10, 30),
          until: new Date(2012, 12, 31)
      });
      this.dates = rule.all();

      //console.log(this.dates);
  }
  addReminder() {
      console.log('addReminder addReminder');
      // create modal
      const modal = this.modalCtrl.create(AddReminderModalPage);
      modal.onDidDismiss(data => {
          console.log(data);
      });
      modal.present();
  }
}
