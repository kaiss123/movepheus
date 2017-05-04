import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { AddReminderModalPage } from '../add-reminder-modal/add-reminder-modal';
import { AddMoveEventModalPage } from '../add-move-event-modal/add-move-event-modal';
import { RRule, RRuleSet } from 'rrule';
import { LocalNotifications } from 'ionic-native';
import * as moment from 'moment';
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
   moveEvents: FirebaseListObservable<any>;
   dates: any[] = [];
   userid: any;
   notifications: any[] = [];

   constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public modalCtrl: ModalController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public localNotifications: LocalNotifications, public platform: Platform) {
       af.auth.subscribe(user => {
           if (user) {
               this.userid = user.auth.uid;
               console.log(user);
           }
       });
       this.reminders = af.database.list('/reminders/' + this.userid);
       this.moves = af.database.list('/moves');
       this.moveEvents = af.database.list('/moveEvents/' + this.userid);

       af.database.list('/moveEvents/' + this.userid)
           .subscribe(me =>
               me.forEach(item => {
                this.handleMoveEvents(item);
           }));
      //         me.forEach(item => {
      //             af.database.list('/moves/' + Object.keys(item.move)[0]).subscribe(m =>
      //                 item.move = m);
      //             af.database.list('/reminders/' + this.userid + '/' + Object.keys(item.rule)[0]).subscribe(m => {
      //                 console.log('M: ', m);
      //                 item['rule'] = m});
      //             this.handleMoveEvents(item);
      //         }));

       //console.dir(this.moveEvents);
   }
    /**
    RRule.YEARLY = 0
    RRule.MONTHLY = 1
    RRule.WEEKLY = 2
    RRule.DAILY = 3
    RRule.HOURLY = 4
    RRule.MINUTELY = 5
    RRule.SECONDLY = 6

    RRule.Mo = 0
    RRule.TU = 1
    RRule.WE = 2
    RRule.TH = 3
    RRule.FR = 4
    RRule.SA = 5
    RRule.SU = 6
    **/
   handleMoveEvents(moveEvent) {
       console.log("MoveEventList init");
       console.dir(moveEvent);


        let rule = new RRule({
            freq: moveEvent.freq,
            count: moveEvent.count,
            interval: moveEvent.interval,
            byweekday: moveEvent.byweekday,
            byhour: moveEvent.byhours
       });
        var rruleSet = new RRuleSet();
        rruleSet.rrule(rule);
        rruleSet.all().forEach(function (date) {
            this.dates.push({ date: date, active: moveEvent.active, color: moveEvent.color, icon: moveEvent.icon, title: moveEvent.title, remindername: moveEvent.remindername, interval:moveEvent.interval });
        }, this);
        this.dates.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime() 
        });
        this.handleNotifications(this.dates);

   }
   handleNotifications(dates) {
       console.log("handleNotifications");
       var index = 1;
       dates.forEach(function (data) {
           let notification = {
               title: 'Hey!',
               text: 'You just got notified :)',
               at: data.date
           };
           this.notifications.push(notification);
           index++;
       }, this);
       console.log("Notifications to be scheduled: ", this.notifications);
       if (this.platform.is('cordova')) {
          // LocalNotifications.cancelAll().then(() => {
               // Schedule the new notifications
               LocalNotifications.schedule(this.notifications);
               this.notifications = [];
               alert("notification added");
           //});
       }
   }
   formatDateTime(date: Date): string {
       if (!date) {
           return '';
       }

       return moment(date).format('HH:mm');
   }
  ionViewDidLoad() {
      console.log('ionViewDidLoad RemindPage');
   }
    //update a reminders checkbox locally and in cloud
  reminderCheckboxUpdate(item) {
      this.reminders.update(item.$key, {
          content: item.content
      });
  }
    //open addReminder Modal for handling Reminder delete/update
  openReminderDetail(item) {
      let actionSheet = this.actionSheetCtrl.create({
          title: 'What do you want to do?',
          buttons: [
              {
                  text: 'Delete Reminder',
                  role: 'destructive',
                  handler: () => {
                      this.reminders.remove(item.$key);
                  }
              }, {
                  text: 'Update Reminder',
                  handler: () => {
                      //this.updateSong(songId, songTitle);
                  }
              }, {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                      console.log('Cancel clicked');
                  }
              }
          ]
      });
      actionSheet.present();
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
                  rule: { byweekday: data.byweekday, notifyTimeStart: data.notifyTimeStart, notifyTimeEnd: data.notifyTimeEnd, byHours: data.byhours },
                  content: { active: true, color: this.randomizeColor(), icon: 'secondary' }
              });
          }

      });
      modal.present();
  }
  randomizeColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  addMoveEvent() {
      // create modal
      const modal = this.modalCtrl.create(AddMoveEventModalPage, { moves: this.moves, reminders: this.reminders });
      console.log('test', this.moves);
      modal.onDidDismiss(data => {
          if (data) {
              console.log('addReminder called');
              console.dir(data);
              //add to firebase
              //create owner Object first to add uid as obj-key
              var ownerObj = {};
              ownerObj[this.userid] = true;
              var moveObj = {};
              moveObj[data.move.$key] = true;
              var reminderObj = {};
              reminderObj[data.reminder.$key] = true;
              this.moveEvents.push({
                  owner: ownerObj,
                  move: moveObj,
                  reminder: reminderObj,
                  title: data.move.title,
                  interval: data.interval,
                  active: data.reminder.content.active,
                  color: data.reminder.content.color,
                  icon: data.reminder.content.icon,
                  remindername: data.reminder.title,
                  byhours: data.reminder.rule.byHours,
                  byweekday: data.reminder.rule.byweekday,
                  notifytimestart: data.reminder.rule.notifyTimeStart,
                  notifytimeend: data.reminder.rule.notifyTimeEnd,
                  freq: RRule.MINUTELY,
                  count: 10

              });
          }

      });
      modal.present();
  }

}
