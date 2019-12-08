import { Component } from '@angular/core';
import {LoadingController, Platform, NavController} from 'ionic-angular';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook.html',
})
export class FacebookPage {

  isLoggedIn:boolean = false;
  users: any;
  name:any;
  pic:any
  constructor(private navCtrl: NavController, private fb: Facebook, public loadingCtrl: LoadingController, private plt: Platform, public afAuth: AngularFireAuth) {
  }

  ionViewWillEnter(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()

    this.fb.getLoginStatus()
        .then(res => {
          if(res.status === "connected") {
            this.isLoggedIn = true;
            this.getUserDetail(res.authResponse.userID);
            loading.dismiss()
          } else {
            this.isLoggedIn = false;
            loading.dismiss()
          }
        })
        .catch((e) => {
          loading.dismiss()
          console.log(e)
        });
  }

  logout() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()
    if (this.plt.is('cordova')) {
      this.fb.logout()
          .then( res => {
            this.isLoggedIn = false
            loading.dismiss()
          })
          .catch(e => {
            loading.dismiss()
            console.log('Error logout from Facebook', e)
          });
    } else{
      this.afAuth.auth.signOut().then( res => {
        this.isLoggedIn = false
        this.users = null
        loading.dismiss()
      })
          .catch(e => {
            loading.dismiss()
            console.log('Error logout from Google', e)
          });
    }

  }

  getUserDetail(userid): Promise<any> {
    return this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
        .then(res => {
          this.users = res;
        })
        .catch(e => {
          console.log(e);
        });
  }


  facebookLoginFirebase(): Promise<any> {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      showBackdrop: false
    });
    loading.present()

    if (this.plt.is('cordova')) {
      return this.fb.login(['public_profile', 'user_friends', 'email'])
          .then(response => {

            const facebookCredential = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken);
            firebase.auth().signInWithCredential(facebookCredential)
                .then(success => {

                  if(success.uid) {
                    this.getUserDetail(response.authResponse.userID);
                    this.isLoggedIn = true;
                    loading.dismiss()
                  } else {
                    this.isLoggedIn = false;
                    loading.dismiss()
                  }
                }).catch(function (error) {
              loading.dismiss()
            });

          }).catch((error) => {
            loading.dismiss()
            console.error(error)
          });
    } else{
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider).then(result => {
        if (result) {
         //this.getUserDetail(result.authResponse.userID);
         //this.getUserDetail(result.user.displayName);
         console.log('result',result)
         this.name = result.user.displayName
         this.pic = result.user.photoURL
        //  console.log('resultidddddddd',result.user.displayName)
          this.isLoggedIn = true;
          loading.dismiss()
        }
      }).catch(error => {
        loading.dismiss()
        console.error(error)
      })
    }
  }

}
