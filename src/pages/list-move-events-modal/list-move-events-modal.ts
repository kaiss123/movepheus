import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

/*
  Generated class for the ListMoveEventsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-move-events-modal',
  templateUrl: 'list-move-events-modal.html'
})
export class ListMoveEventsModalPage {

    dates: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
        this.dates = navParams.get('dates');
        console.log("got this");
        console.dir(this.dates);
        
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListMoveEventsModalPage');
  }
  closeModal(hasdata): void {
      if (hasdata) {
          this.viewCtrl.dismiss();
      } else {
          this.viewCtrl.dismiss();
      }
  }
  formatDateTime(date: Date): string {
      if (!date) {
          return '';
      }

      return moment(date).format('H:mm');
  }
}
