import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SideMenuPage } from '../pages/side-menu/side-menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth, private menuCtrl: MenuController) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.afAuth.authState.subscribe(data => {
        if (data && data.email && data.uid){
          //User exists
          console.log("user exists");
          this.rootPage = SideMenuPage;
        }
        else{
          //User does not exist
          console.log("user is not logged in!")
          this.rootPage = LoginPage;
        }
      })
    });
  }

  openPage(page: any){
    this.rootPage = page;

    //Close side menu
    this.menuCtrl.close();
  }
}
