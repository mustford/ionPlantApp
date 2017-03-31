import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SearchPage;
  tab2Root: any = MapPage;
  tab3Root: any = SettingsPage;

  constructor() {

  }
}
