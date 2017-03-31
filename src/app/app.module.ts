import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { DetailsPage } from '../pages/details/details';
import { ShowMorePage } from '../pages/show-more/show-more';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalWikiPage } from '../pages/modal-wiki/modal-wiki';
import { ModalImgPage } from '../pages/modal-img/modal-img';

import { PostService } from '../providers/post-service';
import { ConfigService } from '../providers/config-service';
import { SortbyNamePipe } from '../pipes/sortby-name';
import { InternetConnectionService } from '../providers/internet-connection-service';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    MapPage,
    SettingsPage,
    DetailsPage,
    ShowMorePage,
    TabsPage,
    ModalWikiPage,
    ModalImgPage,
    SortbyNamePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    MapPage,
    DetailsPage,
    SettingsPage,
    ShowMorePage,
    TabsPage,
    ModalWikiPage,
    ModalImgPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PostService, ConfigService, InternetConnectionService]
})
export class AppModule {}
