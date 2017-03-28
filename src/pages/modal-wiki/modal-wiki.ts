import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal-wiki',
  templateUrl: 'modal-wiki.html'
})
export class ModalWikiPage {
  imgArray: any;
  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController) {
                this.imgArray = this.params.get('imgArray');
                console.log('ionViewDidLoad ModalWikiPage');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalWikiPage');
  }
  dismiss() {
      this.viewCtrl.dismiss();
    }
}
