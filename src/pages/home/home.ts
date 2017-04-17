import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RemindPage } from '../remind/remind';
import { MovePage } from '../move/move';
import { EvaluatePage } from '../evaluate/evaluate';
import { EducatePage } from '../educate/educate';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  goToRemind() {
      this.navCtrl.push(RemindPage);
  }

  goToMove() {
      this.navCtrl.push(MovePage);
  }
  goToEvaluate() {
      this.navCtrl.push(EvaluatePage);
  }
  goToEducate() {
      this.navCtrl.push(EducatePage);
  }
}
