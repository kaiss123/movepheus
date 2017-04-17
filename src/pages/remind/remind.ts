import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AddReminderModalPage } from '../add-reminder-modal/add-reminder-modal';

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
   constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, modalCtrl: ModalController) {
       this.reminders = af.database.list('/reminders');
       this.modalCtrl = modalCtrl;
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindPage');
  }
  addReminder() {
      console.log('addReminder addReminder');
      // create modal
      const modal = this.modalCtrl.create(AddReminderModalPage);
      // open modal
      modal.present();
  }
}
