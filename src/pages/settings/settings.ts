import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigService } from '../../providers/config-service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  lang: string;
  constructor(public navCtrl: NavController, private configService: ConfigService, public params: NavParams) {}
  ngOnInit() {
    this.lang = this.configService.getOption('lang');
  }
  setOption(ev: any) {
    console.log('triggered2');
    this.configService.setOption('lang', ev);
    this.navCtrl.push(SearchPage);
  }
  refresh() {
    this.lang = this.configService.getOption('lang');
  }
}
