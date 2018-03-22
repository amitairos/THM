import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KitzurHtSubjectsPage } from '../kitzur-ht-subjects/kitzur-ht-subjects';
declare var require: any;
var hebcal = require('hebcal');


export interface Time {
  Type: string;
  Time: Date;
  Icon: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Times: Time[] = [];
  day: any;
  parsha: any;
  heb:any;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.day = new hebcal.HDate().toString('h');
    this.parsha = new hebcal.HDate().getSedra('h');
    this.heb = new hebcal.HDate();
    this.heb.setLocation(31.89, 35.01);
    var zmanim = this.heb.getZemanim();
    this.Times.push({ Type: 'עלות השחר', Time: zmanim.alot_hashachar, Icon: 'assets/imgs/icons/ic_alot.png' });
    this.Times.push({ Type: 'טלית ותפילין', Time: zmanim.misheyakir, Icon: 'assets/imgs/icons/ic_tut.png' });
    this.Times.push({ Type: 'נץ החמה', Time: zmanim.neitz_hachama, Icon: 'assets/imgs/icons/ic_zricha.png' });
    this.Times.push({ Type: 'סו"ז ק"ש', Time: zmanim.sof_zman_shma, Icon: 'assets/imgs/icons/ic_shma.png' });
    this.Times.push({ Type: 'סו"ז תפילה', Time: zmanim.sof_zman_tfilla , Icon: 'assets/imgs/icons/ic_tfilla.png'});
    this.Times.push({ Type: 'זמן מנחה', Time: zmanim.mincha_gedola, Icon: 'assets/imgs/icons/daven_anim.gif' });
    this.Times.push({ Type: 'שקיעה', Time: zmanim.shkiah, Icon: 'assets/imgs/icons/ic_shkiaa.png' });
    this.Times.push({ Type: 'צאת הכוכבים', Time: zmanim.tzeit, Icon: 'assets/imgs/icons/ic_tzet.png' });
  }

  openKitzurHT() {
    this.navCtrl.push(KitzurHtSubjectsPage);
  }

}
