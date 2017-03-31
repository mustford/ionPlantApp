import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal-img',
  templateUrl: 'modal-img.html'
})
export class ModalImgPage {
  imgUrl: string;
  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController) {
                this.imgUrl = this.params.get('imgUrl');
                console.log('ionViewDidLoad ModalImgPage');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalImgPage');
  }
  dismiss() {
      this.viewCtrl.dismiss();
    }
}
