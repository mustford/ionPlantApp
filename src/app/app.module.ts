import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { DetailsPage } from '../pages/details/details';
import { ShowMorePage } from '../pages/show-more/show-more';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalWikiPage } from '../pages/modal-wiki/modal-wiki';

import { PostService } from '../providers/post-service';
import { ConfigService } from '../providers/config-service';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    SettingsPage,
    DetailsPage,
    ShowMorePage,
    TabsPage,
    ModalWikiPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    DetailsPage,
    SettingsPage,
    ShowMorePage,
    TabsPage,
    ModalWikiPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PostService, ConfigService]
})
export class AppModule {}
