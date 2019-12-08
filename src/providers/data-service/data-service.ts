import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import firebase from 'firebase';
/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: HttpClient) {
    
    console.log('Hello DataServiceProvider Provider');
  }
  // getListDetails(){
  //   //return this.http.get('assets/data/products.json').map((response:Response)=>response.json());
  //   let req = new XMLHttpRequest();
  //   req.onreadystatechange = () => {
  //   if (req.readyState == XMLHttpRequest.DONE)
  //   {
  //   console.log(req.responseText);
  //   }
  //   };
  //   //https://api.jsonbin.io/b/5cb15ec4612a854ce4513860
  //   //req.open("GET", "https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d", true);
  //   req.open("GET", "https://api.jsonbin.io/b/5cb1601f26ddc84cea3dc76e", true);
  //   req.setRequestHeader("secret-key","$2a$10$TRXHifpRFh8/AE9G8UQ8IOHQMxP6UXUwHOJYxd1pasTC87YqvQMfe");
  //   req.send()
  //   return this.http.get('https://api.myjson.com/bins/17zfli').map((response:Response)=>response.json());
  //   //https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d
  //   //https://easybus-d1ec4.firebaseio.com/
  // }
  getListDetails(){
    //return this.http.get('assets/data/products.json').map((response:Response)=>response.json());
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE)
    {
    console.log(req.responseText);
    }
    };
    //https://api.jsonbin.io/b/5cb15ec4612a854ce4513860
    //req.open("GET", "https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d", true);
    // req.open("GET", "https://api.jsonbin.io/b/5cb1601f26ddc84cea3dc76e", true);
    // req.setRequestHeader("secret-key","$2a$10$TRXHifpRFh8/AE9G8UQ8IOHQMxP6UXUwHOJYxd1pasTC87YqvQMfe");
    // req.send()
    return this.http.get('https://easybus-d1ec4.firebaseio.com/.json').map((response:Response)=>response.json());
    //https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d
    //https://easybus-d1ec4.firebaseio.com/
  }

  // getListDetails(){
  //   let keys_values = []
  //   firebase.database().ref().on('value', (snap) => {
  //       let result = snap.val();
  //       for(let k in result){
  //         keys_values.push({
  //           key : k,
  //           values : result[k]
  //         })
  //         console.log('aaa',keys_values)
  //       }console.log('bb',keys_values)
  //       return keys_values
  //   });
  //   console.log('cc',keys_values)
    
  // }
}
