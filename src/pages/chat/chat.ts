import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  //---------- LIST OF PRIVATE AND PUBLIC FIELDS ----------------
  currentUserUid: string;
  num: number;



  //---------- CONSTRUCTORS OF THE CHAT FUNCTION --------------------
  constructor(public navCtrl: NavController, public navParams: NavParams,
             public afAuth: AngularFireAuth, public afData: AngularFireDatabase ) {
  }


  //------------------ LIST OF METHODS TO USE ------------------
  sendMessage(message: Message){
    try{
      // this.num = 0;
      // message.sender = "this.currentUserUid";
      // message.receiver = "cmjAAcO5CsXe9ez7iTxuaASM9hE2";
      // message.text = this.newmessage;

      this.afData.list('/chats/' + this.currentUserUid + '/messages/').push({
        0: {
          sender: this.currentUserUid,
          receiver: "cmjAAcO5CsXe9ez7iTxuaASM9hE2",
          text: this.newmessage

        }
      })
    }
    catch(error){
      console.log(error);
    }
  }


  ionViewWillLoad() {

    //Subscribe to Firebase Authentication state, similar to onAuthStateChanged
    this.afAuth.authState.subscribe(data => {

      // console.log("data", data);
      if (data && data.email && data.uid){
        this.currentUserUid = data.uid;
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


//var ChatDataBase = this.afData.database.ref('chats');
//this.messagesList = this.afData.list('/chats').valueChanges();
