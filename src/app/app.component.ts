import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav,Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
//import { AboutPage } from '../pages/about/about';
import { TraficMapPage } from '../pages/trafic-map/trafic-map';
import { MapSearchPage } from '../pages/map-search/map-search';
// import { AccountPage } from '../pages/account/account';
// import { LoginPage } from '../pages/login/login';
// import { MapPage } from '../pages/map/map';
// import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SchedulePage } from '../pages/schedule/schedule';
// import { SupportPage } from '../pages/support/support';

import { Data } from '../providers/data';
import { UserData } from '../providers/user-data';
//import { HomePage } from '../pages/home/home';
// import { AboutPage } from '../pages/about/about';
import { MemberListPage } from '../pages/member-list/member-list';
import { WebPage } from '../pages/web/web';

import {LoadingController} from 'ionic-angular';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import {AngularFireAuth} from "angularfire2/auth";
import { CameraPage } from '../pages/camera/camera';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;

}


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //fix
  // Giao diên Điều hướng trong menu
  appPages: PageInterface[] = [
    { title: 'Trang chủ', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'home',},
    // { title: 'Lịch sử', name: 'TabsPage', component: TabsPage, tabComponent: "", index: 1, icon: 'paper' },
    { title: 'Tìm đường', name: 'TabsPage', component: TabsPage, tabComponent: MapSearchPage, index: 1, icon: 'search' },
    { title: 'Lưu lượng xe', name: 'TabsPage', component: TabsPage, tabComponent: TraficMapPage, index: 2, icon: 'map' },
    { title: 'Chia sẻ', name: 'TabsPage', component: TabsPage, tabComponent: CameraPage, index: 3, icon: 'camera' },
    { title: 'Tin tức', name: 'TabsPage', component: TabsPage, tabComponent: WebPage, index: 4, icon: 'paper' },

    // { title: 'Quét', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, index: 3, icon: 'person' }
  ];

  // Giao diện 
  // loggedInPages: PageInterface[] = [
  //   { title: 'Tài khoản', name: 'AccountPage', component: AccountPage, icon: 'person' },
  //   { title: 'Đăng xuất', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true },
  //   { title: 'Hỗ trợ', name: 'SupportPage', component: SupportPage, icon: 'help' }
  //   // { title: 'Nạp vé', name: 'RechagrePage', component: RechagrePage, icon: 'pricetag'}
  // ];
  // loggedOutPages: PageInterface[] = [
  //   { title: 'Đăng nhập', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
  //   { title: 'Đăng kí', name: 'SignupPage', component: SignupPage, icon: 'person-add' },
  //   { title: 'Hỗ trợ', name: 'SupportPage', component: SupportPage, icon: 'help' }
  // ];
  rootPage: any;


  isLoggedIn:boolean = false;
  users: any; //id user facebook
  name:any; //name user facebook
  pic:any; // picture user facebook
  id:any; //id user facebook
  pic_1:any; // picture user facebook
  name_1:any; //name user facebook
  id_test:any; //ud user facebook test
  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: Data,
    public storage: Storage,
    public splashScreen: SplashScreen,
    //------------------------
    //private navCtrl: NavController, 
    private fb: Facebook, 
    public loadingCtrl: LoadingController, 
    private plt: Platform, 
    public afAuth: AngularFireAuth
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }
//----------------------------
//Hiện thị giao diện trang
ionViewWillEnter(){

  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    showBackdrop: false
  });
  loading.present()

  this.fb.getLoginStatus() //Kiểm tra kết nối facebook
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


//đăng xuất facebook
logout() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    showBackdrop: false
  });
  loading.present()
  if (this.plt.is('cordova')  || this.plt.is('android')) {
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
//Gọi dữ liệu chi tiết của user facebook
getUserDetail(userid): Promise<any> {
  return this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
}

//Đăng nhập facebook với firebase
facebookLoginFirebase(): Promise<any> {

  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    showBackdrop: false
  });
  loading.present()

  if (this.plt.is('cordova') || this.plt.is('android')) {
    return this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(response => {

          const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential)
              .then(success => {

                if(success.uid) {
                  this.getUserDetail(response.authResponse.userID);
                  this.id = response.authResponse.userID
                  this.pic = "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid="+this.id+"&height=100&width=100&ext=1556475087&hash=AeQXWeQWd2xOGPVX"
                  console.log('ID', response.authResponse.userID)
                  this.name = success.displayName
                  //console.log("response", response)
                  this.isLoggedIn = true;
                  loading.dismiss()
                  //window.alert('isLoggedIn=true')
                } else {
                  this.isLoggedIn = false;
                  loading.dismiss()
                  //window.alert('isLoggedIn=false')
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
       this.id = result.additionalUserInfo.profile
       this.id = this.id.id
      //  console.log("Profile",result.additionalUserInfo.profile)
      //  console.log("ID ID",this.id.id)
      //  console.log("Pic", this.id.picture.data.url)
      //  window.alert(result.user.displayName)
      //  this.pic_1 = this.id.picture.data.url
      
       //this.name_1 = this.id.name
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
//----------------------------
  openPage(page: PageInterface) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }
  //Hiện thị trang giới thiệu dự án
  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }
  //Hiện thị trang giới thiệu thành viên nhóm
  openMember() {
    this.nav.setRoot(MemberListPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  //Kiểm tra nền nảng mobile
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
  // camera()
  // {
  //   this.navCtrl.push(CameraPage)
  // }
}
