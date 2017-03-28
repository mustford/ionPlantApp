import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowMorePage } from '../show-more/show-more';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  viewItem(item, header) {
    this.navCtrl.push(ShowMorePage, {
      item: item,
      header: header
    })
  }

}
