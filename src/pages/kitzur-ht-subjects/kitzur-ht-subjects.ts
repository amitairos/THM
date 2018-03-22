import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the KitzurHtSubjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kitzur-ht-subjects',
  templateUrl: 'kitzur-ht-subjects.html',
})
export class KitzurHtSubjectsPage {
  subjects=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseprovider: DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadKitzurSubjectsData();
      }
    })
   
  }

  loadKitzurSubjectsData() {
    this.databaseprovider.getKitzurHTSubjects("Chol").then(data => {
      this.subjects = data;
    })
  }

}
