import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the SideMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewCanEnter() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid){
        this.navCtrl.setRoot('DashboardPage');
      }
    })
  }


  openPage(page: any){
    this.navCtrl.push(page);
  }

}
