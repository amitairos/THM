import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

export interface HalachaItem {
  Title: string;

}


@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'TM.sqlite',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.databaseReady.next(true);
        });
    });
  }

  getKitzurHTSubjects(Chelek: string) {
    return this.database.executeSql("SELECT * FROM KitzurHilchotTzava Where Chelek=" + Chelek, []).then((data) => {
      let subjects = [];
      let subject = '';
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          if (data.rows.item(i).Main_Subject != subject) {
            subject = data.rows.item(i).Main_Subject;
            subjects.push({ Main_Subject: data.rows.item(i).Main_Subject, Color: data.rows.item(i).Color, childSubjects: [] });
            subjects[subjects.length - 1].childSubjects.push(data.rows.item(i).Child_Subject);
          }
          else {
            if ((subjects[subject.length - 1].childSubjects[subjects[subject.length - 1].childSubjects.length - 1]) != data.rows.item(i).Child_Subject) {
              subjects[subjects.length - 1].childSubjects.push(data.rows.item(i).Child_Subject);
            }

          }
          subject = data.rows.item(i).Main_Subject;
        }
      }
      return subjects;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getAllDevelopers() {
    return this.database.executeSql("SELECT * FROM developer", []).then((data) => {
      let developers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          developers.push({ name: data.rows.item(i).name, skill: data.rows.item(i).skill, yearsOfExperience: data.rows.item(i).yearsOfExperience });
        }
      }
      return developers;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}