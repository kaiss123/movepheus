import {Component} from '@angular/core';
import {
    ActionSheetController, AlertController, ModalController, NavController, NavParams,
    Platform
} from 'ionic-angular';
import {AddReminderModalPage} from '../add-reminder-modal/add-reminder-modal';
import {AddMoveEventModalPage} from '../add-move-event-modal/add-move-event-modal';
import {ListMoveEventsModalPage} from '../list-move-events-modal/list-move-events-modal';
import {RRule, RRuleSet} from 'rrule';
import * as moment from 'moment';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {User} from "firebase/app";

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

    reminders: any;
    moves: any;
    moveEvents: any;
    dates: any[] = [];
    userid: any;
    notifications: any[] = [];
    notificationIndex: number = 0;
    days: any[];
    hiddenFields = true;
    private currentUser: User;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public afDB: AngularFireDatabase,
                public afAuth: AngularFireAuth,
                public modalCtrl: ModalController,
                public alertCtrl: AlertController,
                public actionSheetCtrl: ActionSheetController,
                public localNotifications: LocalNotifications,
                public platform: Platform) {

        // af.list('/moveEvents/' + this.userid)
        //     .subscribe(me => {
        //         this.reset();
        //         me.forEach(item => {
        //             this.handleMoveEvents(item);
        //         })
        //     });

        //         me.forEach(item => {
        //             af.database.list('/moves/' + Object.keys(item.move)[0]).subscribe(m =>
        //                 item.move = m);
        //             af.database.list('/reminders/' + this.userid + '/' + Object.keys(item.rule)[0]).subscribe(m => {
        //                 console.log('M: ', m);
        //                 item['rule'] = m});
        //             this.handleMoveEvents(item);
        //         }));

        //console.dir(this.moveEvents);
        afAuth.authState.subscribe((user) => {
            debugger;
            this.currentUser = user;
            this.start();
        });
    }

    start() {

        this.userid = this.currentUser.uid;
        console.dir(this.currentUser);

        this.localNotifications.hasPermission();
        this.reminders = this.afDB.list('/reminders/' + this.userid).valueChanges();
        this.moves = this.afDB.list('/moves').valueChanges();
        this.moveEvents = this.afDB.list('/moveEvents/' + this.userid).valueChanges();
        console.log('reminders: ');
        console.dir(this.reminders);
    }

    reset() {
        this.days = [
            {title: 'Monday', dayCode: 1, checked: false, reminders: []},
            {title: 'Tuesday', dayCode: 2, checked: false, reminders: []},
            {title: 'Wednesday', dayCode: 3, checked: false, reminders: []},
            {title: 'Thursday', dayCode: 4, checked: false, reminders: []},
            {title: 'Friday', dayCode: 5, checked: false, reminders: []},
            {title: 'Saturday', dayCode: 6, checked: false, reminders: []},
            {title: 'Sunday', dayCode: 7, checked: false, reminders: []}
        ];
        this.dates = [];
    }

    handleMoveEvents(moveEvent) {
        console.log("MoveEventList init");
        console.dir(moveEvent);
        moveEvent.byweekday.forEach(function (data, i) {
            console.log(data);
            console.log(this.days);
            this.days[data - 1].reminders.push(moveEvent);
        }, this);
        console.dir(this.days);

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
            this.dates.push({
                date: date,
                active: moveEvent.active,
                byweekday: moveEvent.byweekday,
                color: moveEvent.color,
                icon: moveEvent.icon,
                title: moveEvent.title,
                remindername: moveEvent.remindername,
                interval: moveEvent.interval
            });
        }, this);
        this.dates.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
        this.handleNotifications(this.dates);

    }

    handleNotifications(dates) {
        console.log("handleNotifications");
        console.dir(dates);
        dates.forEach(function (data, i) {
            let notification = {
                id: this.notificationIndex,
                title: data.title,
                text: data.date,
                at: data.date
            };
            this.notifications.push(notification);
            this.notificationIndex = this.notificationIndex + 1;
        }, this);
        console.log("Notifications to be scheduled: ", this.notifications);
        console.log("alle sheduled");
        console.log(this.localNotifications.getAllScheduled());
        if (this.platform.is('cordova')) {
            this.localNotifications.cancelAll().then(() => {
                this.localNotifications.schedule(this.notifications);
                this.notifications = [];
            });
        }
    }

    formatDateTime(date: Date): string {
        if (!date) {
            return '';
        }

        return moment(date).format('H:mm');
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
                    rule: {
                        byweekday: data.byweekday,
                        notifyTimeStart: data.notifyTimeStart,
                        notifyTimeEnd: data.notifyTimeEnd,
                        byHours: data.byhours
                    },
                    content: {active: true, color: this.randomizeColor(), icon: 'secondary'}
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
        const modal = this.modalCtrl.create(AddMoveEventModalPage, {moves: this.moves, reminders: this.reminders});
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
                    count: 1

                });
            }

        });
        modal.present();
    }

    listMoveEvents() {
        const modal = this.modalCtrl.create(ListMoveEventsModalPage, {dates: this.dates});

        console.log("send this");
        console.dir(this.dates);
        modal.present();

    }
}
