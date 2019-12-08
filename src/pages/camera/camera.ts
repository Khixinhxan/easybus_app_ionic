import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { SocialSharing} from "@ionic-native/social-sharing"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  image: string;

  message: string = null;
  file: string = null;
  link: string = null;
  subject: string = null;

  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private socialSh: SocialSharing,
    private alertCtrl: AlertController) {}

  pictureFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.capturePhoto(options);
  }

  pictureFromGallery() {
    //Added PictureSourceType.PHOTOLIBRARY to access from gallery.
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.capturePhoto(options)
  }
  
  async capturePhoto(options: CameraOptions) {
    try {
      //Result is a base64 image but can be changed to use a filepath.
      const result = await this.camera.getPicture(options)

      //Append result to image to display in view
      this.image = `data:image/jpeg;base64,${result}`;
    }
    catch (e) {
      console.error(e);
    }
  }
  // share()
  // { this.presentAlert()
  //   this.socialSh.shareViaFacebook(this.message,
  //   this.image,
  //   this.link)
    
  //        .then(() => {
  //          //this.presentAlert()
  //        })
  //        .catch(() => {
  //          //this.presentAlertError()
           
  //        });
  // }
  share_with_option()
  {
   
    let options = {
    message: '', // not supported on some apps (Facebook, Instagram)
    subject: '', // fi. for email
    files: [this.image], // an array of filenames either locally or remotely
    url: '',
    chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }
    this.presentAlert()
    if(this.image!=null || this.image!='')
    {
    this.socialSh.shareWithOptions(options)
           .then(() => {
           })
           .catch(() => {
           });
    }
    else
    {
      this.presentAlertWithoutImage()
    }
  }
  // shareFacebook(e) {
    
  //   e.preventDefault();
  //   var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
  //   console.log(document.URL)
  //   if(facebookWindow.focus) { facebookWindow.focus(); }
  //     return false;
  //  }
   presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo',
      subTitle: 'Các bạn nhớ kèm 1 hashtag #easybus trong nội dung chia sẻ nhé!',
      buttons: ['Ok']
    });
    alert.present();
  }
  presentAlertWithoutImage() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo',
      subTitle: 'Bạn chưa chọn hình ảnh để chia sẻ. Vui lòng kiểm tra lại',
      buttons: ['Ok']
    });
    alert.present();
  }
}
