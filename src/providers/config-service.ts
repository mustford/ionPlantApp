import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ConfigService {
  private config = {};

  constructor(public http: Http) {
    console.log('Hello ConfigService Provider');
  }
  setOption(option, value) {
    // console.log(option);
    // console.log(value);
    localStorage.setItem(option, value);
    this.config[option] = value;
  }
  getOption(option) {
    if (localStorage.getItem(option) != null) {
      this.config[option] = localStorage.getItem(option);
      // console.log(option);
      // console.log(this.config[option]);
      return this.config[option];
    } else {
      if (option == 'lang') {
        this.config['lang'] = 'ua'
      }
      // console.log(option);
      // console.log(this.config[option]);
      localStorage.setItem(option, this.config[option]);
      return this.config[option];
    }

  }

}
