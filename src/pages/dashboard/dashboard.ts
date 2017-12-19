import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  //------------------------- LIST OF COMPONENTS ---------------------------
  image: string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  //----------------------- CONSTRUCTORS -----------------------------------
  constructor(
    private afAuth: AngularFireAuth, private toast: ToastController, private camera: Camera,
    public navCtrl: NavController, public navParams: NavParams) {
  }


  //---------------------- FUNCTION THAT WILL RETURN A PROMISE ------------
  async takePicture(): Promise<any>{
    try{
      this.image = await this.camera.getPicture(this.options);
    }
    catch(e){
      console.log(e);
    }

  }




  ionViewWillLoad() {

    //Subscribe to Firebase Authentication state, similar to onAuthStateChanged
    this.afAuth.authState.subscribe(data => {

      // console.log("data", data);
      if (data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to Snapbit, ${data.email}`,
          duration: 3500
        }).present();
      }
      else
      {
        this.toast.create({
          message: `Could not find authentication detail!`,
          duration: 3500
        }).present();
      }

    });
  }


}
