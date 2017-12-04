import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FCM} from "@ionic-native/fcm";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {AdminTopicPage} from "../admin-topic/admin-topic";

/**
 * Generated class for the TopicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Topic { radiostationId:string,topicName: string}

@IonicPage()
@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html',
})
export class TopicsPage {

  private radiostationId:string;
  private radiostationName: string;

  private topicColl: AngularFirestoreCollection<Topic>;
  private topics: Observable<Topic[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,private fcm:FCM,private afstore:AngularFirestore) {
    this.radiostationId = this.navParams.get("id")
    this.radiostationName = this.navParams.get("title");
    this.topicColl = this.afstore.collection("Topics",ref =>
      ref.where('radiostationId','==',this.radiostationId)
    );
    this.topics = this.topicColl.valueChanges()
  }

  navToAddTopic(){
    console.log(this.radiostationId)
    this.navCtrl.push(AdminTopicPage,{id: this.radiostationId})
  }

}
