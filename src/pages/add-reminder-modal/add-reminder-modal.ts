import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, Platform  } from 'ionic-angular';
import * as moment from 'moment';
import { RRule } from 'rrule';
/*
  Generated class for the AddReminderModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-reminder-modal',
  templateUrl: 'add-reminder-modal.html'
})
export class AddReminderModalPage {
    notifyTimeStart: any;
    notifyTimeEnd: any;
    byweekday: any[];
    days: any[];
    chosenHoursStart: number;
    chosenMinutesStart: number;
    chosenHoursEnd: number;
    chosenMinutesEnd: number;
    name: string = 'new Reminder';

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public alertCtrl: AlertController, public platform: Platform) {
        this.notifyTimeStart = moment(new Date()).format();
        this.notifyTimeEnd = moment(new Date()).add(15, 'm').format();

        this.chosenHoursStart = new Date().getHours();
        this.chosenMinutesStart = new Date().getMinutes();
        this.chosenHoursEnd = new Date().getHours();
        this.chosenMinutesEnd = new Date().getMinutes();

        this.days = [
            { title: 'Monday', dayCode: 1, checked: false , rule: 1},
            { title: 'Tuesday', dayCode: 2, checked: false, rule: 2},
            { title: 'Wednesday', dayCode: 3, checked: false, rule: 3},
            { title: 'Thursday', dayCode: 4, checked: false, rule: 4},
            { title: 'Friday', dayCode: 5, checked: false, rule: 5},
            { title: 'Saturday', dayCode: 6, checked: false, rule: 6},
            { title: 'Sunday', dayCode: 0, checked: false, rule: 7}
        ];
    }
     	

//new RRule({
//    freq: RRule.MINUTELY,
//   dtstart: new Date(2017, 3, 26, 8, 30, 0),
//    count: 30,
//    interval: 15,
//    wkst: RRule.WE,
//    byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
//    byhour: [9, 10, 11, 12, 13, 14, 15, 16]
//})
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReminderModalPage');
  }

  closeModal(hasdata): void {
      let data = {
          'name': this.name,
          'byweekday': this.byweekday,
          'notifyTimeStart': this.notifyTimeStart,
          'notifyTimeEnd': this.notifyTimeEnd
      };
      if (hasdata) {
          this.viewCtrl.dismiss(data);
      } else {
          this.viewCtrl.dismiss();
      }
  }
  timeChangeStart(time) {
      this.chosenHoursStart = time.hour.value;
      this.chosenMinutesStart = time.minute.value;
  }
  timeChangeEnd(time) {
      this.chosenHoursEnd = time.hour.value;
      this.chosenMinutesEnd = time.minute.value;
  }
    addNotifications() {

        let currentDate = new Date();
        let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

        this.byweekday = [];
        for (let day of this.days) {

            if (day.checked) {
                this.byweekday.push(day.rule);

                let firstNotificationTime = new Date();
                let dayDifference = day.dayCode - currentDay;

                if (dayDifference < 0) {
                    dayDifference = dayDifference + 7; // for cases where the day is in the following week
                }

                firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
                firstNotificationTime.setHours(this.chosenHoursStart);
                firstNotificationTime.setMinutes(this.chosenMinutesStart);

            }

        }

        this.closeModal(true);
    }

}
