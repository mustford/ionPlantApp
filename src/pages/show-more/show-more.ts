import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-show-more',
  templateUrl: 'show-more.html'
})
export class ShowMorePage {
  item: any;
  header: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
    this.header = navParams.get("header");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowMorePage');
  }

}
