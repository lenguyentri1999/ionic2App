import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  errorMessage: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public menuCtrl: MenuController) {

    //Disable swipe menu on login screen
    this.menuCtrl.swipeEnable(false);
  };


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  async login(user: User) {
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log('result', result);
      if (result){
        this.navCtrl.setRoot('DashboardPage');
      }
    }
    catch(error){
      console.log(error)
      this.errorMessage = error.message;
    }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
