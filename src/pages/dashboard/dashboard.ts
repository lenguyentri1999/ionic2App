import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  //------------------------- LIST OF COMPONENTS ---------------------------
  currentUserUid: any;
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




  //------------- TAKE A PICTURE --------------------
  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {

      //Send picture to firebase storage
       const imageObjectRef = firebase.storage().ref('profilePictures/' + this.currentUserUid + '/profilePicture.jpg');
       imageObjectRef.putString(imageData, 'base64', {contentType:'image/jpg'});
       console.log("Successfully pushed to database");


    }, (err) => {
      console.log(err);
    });
  }




  ionViewWillLoad() {

    //Subscribe to Firebase Authentication state, similar to onAuthStateChanged
    this.afAuth.authState.subscribe(data => {

      // console.log("data", data);
      if (data && data.email && data.uid){
        this.currentUserUid = data.uid;
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
