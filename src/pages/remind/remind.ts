import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
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
   af: AngularFire;
   userid: any;

   constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, modalCtrl: ModalController) {
       this.modalCtrl = modalCtrl;
       this.af = af;
       af.auth.subscribe(user => {
           if (user) {
               this.userid = user.auth.uid;
               console.log(user);
           }
       });
       this.reminders = af.database.list('/reminders/' + this.userid);
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
    //update a reminders checkbox locally and in cloud
  reminderCheckboxUpdate(item) {
      this.reminders.update(item.$key, {
          content: item.content
      });
  }
  addReminder() {
      // create modal
      const modal = this.modalCtrl.create(AddReminderModalPage);
      modal.onDidDismiss(data => {
          if (data) {
              console.log('addReminder called');
              console.dir(data);
              //add to firebase
              //create owner Object first to add uid as obj-key
              var ownerObj = {};
              ownerObj[this.userid] = true;
              this.reminders.push({
                  title: data.name,
                  owner: ownerObj,
                  byweekday: data.byweekday,
                  notifyTimeStart: data.notifyTimeStart,
                  notifyTimeEnd: data.notifyTimeEnd,
                  content: { active: true, color: 'secondary', range: '9 - 5' }
              });
          }

      });
      modal.present();
  }
}
