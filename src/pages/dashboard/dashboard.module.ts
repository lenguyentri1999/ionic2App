import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  providers: [
    Contacts
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
  ],
})
export class DashboardPageModule {}
