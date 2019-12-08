import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';

// import { HttpClientModule } from '@angular/common/http';
// import { Http,HttpModule } from '@angular/http';

//import {LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
// export class HomePage {

//   //loginPage = LoginPage;
//   products: any[] = [];
//   selectedProduct: any;
//   productFound:boolean = false;

//   constructor(private navCtrl: NavController,
//     private barcodeScanner: BarcodeScanner,
//     private toast: Toast,
//     public dataService: DataServiceProvider) 
//     {
//       this.dataService.getListDetails().subscribe((response)=> {
//         this.products.push(response);
//           console.log(this.products);

//       });
//     }
//     scan() {
//       this.selectedProduct = {};
//       this.barcodeScanner.scan().then((barcodeData) => {
//         this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
//         if(this.selectedProduct !== undefined) {
//           this.productFound = true;
//           this.toast.show(`Product was found`, '5000', 'center').subscribe(
//             toast => {
//               console.log(toast);
//             }
//           );
//         } else {
//           this.productFound = false;
//           this.toast.show(`Product not found`, '5000', 'center').subscribe(
//             toast => {
//               console.log(toast);
//             }
//           );
//         }
//       }, (err) => {
//         this.toast.show(err, '5000', 'center').subscribe(
//           toast => {
//             console.log(toast);
//           }
//         );
//       });
//     }

// }


// export class HomePage {
//   qrData = null;
//   createdCode = null;
//   scannedCode = null;
 
//   constructor(private barcodeScanner: BarcodeScanner) { }
 
//   createCode() {
//     this.createdCode = this.qrData;
//   }
 
//   scanCode() {
    
//     this.barcodeScanner.scan().then(barcodeData => {
//       this.scannedCode = barcodeData.text;
//     }, (err) => {
//         console.log('Error: ', err);
//     });
//   }
 
// }
export class HomePage {
  qrData = null;
  createdCode = null;
  scannedCode = null;
 
  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;

  constructor(
    public navCtrl: NavController,
    private toast: Toast,
    public dataService: DataServiceProvider,
    public menuCtrl: MenuController) 
     {
          //  this.dataService.getListDetails().subscribe((response)=> {
          //    this.products.push(response);
          //      console.log(this.products);
               
    
          //  });
    }
 
  // createCode() {
  //   this.createdCode = this.qrData;
  // }
 
  // scanCode() {
  //   this.selectedProduct = {};
  //   this.barcodeScanner.scan().then(barcodeData) => {
  //     this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      
  //     if(this.selectedProduct !== undefined) {
  //                 this.productFound = true;
  //                 this.toast.show(`Bus was found`, '5000', 'center').subscribe(
  //                   toast => {
  //                     console.log(toast);
  //                   }
  //                 );
  //               } else {
  //                 this.productFound = false;
  //                 this.toast.show(`Bus not found`, '5000', 'center').subscribe(
  //                   toast => {
  //                     console.log(toast);
  //                   }
  //                 );
  //               }
  //             }, (err) => {
  //               this.toast.show(err, '5000', 'center').subscribe(
  //                 toast => {
  //                   console.log(toast);
  //                 }
  //               );
  //             });
  //           }
  // scanCode() {
  //   this.selectedProduct = {};
  //   this.barcodeScanner.scan().then((barcodeData) => {
  //     this.selectedProduct = this.products.find(product => '01234567895'  === barcodeData.text);
  //     if(this.selectedProduct !== undefined) {
  //       this.productFound = true;
  //       console.log(this.selectedProduct);
  //     } else {
  //       this.selectedProduct = {};
  //       this.productFound = false;
  //       this.toast.show('Bus not found', '5000', 'center').subscribe(
  //         toast => {
  //           console.log(toast);
  //         }
  //       );
  //     }
  //   }, (err) => {
  //     this.toast.show(err, '5000', 'center').subscribe(
  //       toast => {
  //         console.log(toast);
  //       }
  //     );
  //   });
  // }
  // openMenu() {
  //             this.menuCtrl.open();
  //           }
           
  // closeMenu() {
  //             this.menuCtrl.close();
  //           }
           
  // toggleMenu() {
  //             this.menuCtrl.toggle();
  //           }
            
}