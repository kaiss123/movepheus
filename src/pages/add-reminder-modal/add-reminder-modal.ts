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
    byweekday: any[] = [];
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
            { title: 'Monday', dayCode: 1, checked: false , rule: RRule.MO},
            { title: 'Tuesday', dayCode: 2, checked: false, rule: RRule.TU},
            { title: 'Wednesday', dayCode: 3, checked: false, rule: RRule.WE},
            { title: 'Thursday', dayCode: 4, checked: false, rule: RRule.TH},
            { title: 'Friday', dayCode: 5, checked: false, rule: RRule.FR},
            { title: 'Saturday', dayCode: 6, checked: false, rule: RRule.SA},
            { title: 'Sunday', dayCode: 0, checked: false, rule: RRule.SU}
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

  closeModal(): void {
      let data = { 'name': this.name, 'byweekday': this.byweekday, 'notifyTimeStart': this.notifyTimeStart, 'notifyTimeEnd': this.notifyTimeEnd};
      this.viewCtrl.dismiss(data);
      console.log('dissmiss');
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

        this.closeModal();
    }

}
