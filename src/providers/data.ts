import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
// import { exists } from 'fs';

import firebase from 'firebase';
@Injectable()
export class Data {
  data: any;

  constructor(public http: Http, public user: UserData) { }


  // getJson()
  // {
  //   let req = new XMLHttpRequest();
  //   req.onreadystatechange = () => {
  //   if (req.readyState == XMLHttpRequest.DONE)
  //   {
  //   console.log(req.responseText);
  //   }
  //   };
  //   req.open("GET", "https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d", true);
  //   req.setRequestHeader("secret-key","$2a$10$TRXHifpRFh8/AE9G8UQ8IOHQMxP6UXUwHOJYxd1pasTC87YqvQMfe");
  //   req.send()
  // }
  // load(): any {
  //   //this.getJson()
  //   if (this.data) {
  //     return Observable.of(this.data);
  //   } else {
  //     let req = new XMLHttpRequest();
  //     req.onreadystatechange = () => {
  //     if (req.readyState == XMLHttpRequest.DONE)
  //     {
  //     console.log('reg.responseText',req.responseText);
  //     }
  //     };
  //     //https://api.jsonbin.io/b/5cb15ec4612a854ce4513860
  //     //req.open("GET", "https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d", true);
  //     req.open("GET", "https://api.jsonbin.io/b/5cb1601f26ddc84cea3dc76e", true);
  //     req.setRequestHeader("secret-key","$2a$10$TRXHifpRFh8/AE9G8UQ8IOHQMxP6UXUwHOJYxd1pasTC87YqvQMfe");
  //     req.send()
  //     //return this.http.get('assets/data/data.json')
  //     return this.http.get('https://api.myjson.com/bins/17zfli')
  //       .map(this.processData, this);
  //   }
  // }

  load(): any {
    //this.getJson()
    // if (this.data) {
    //   return Observable.of(this.data);
    // } else {
      let req = new XMLHttpRequest();
      req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE)
      {
      console.log('reg.responseText',req.responseText);
      }
      };
      //https://api.jsonbin.io/b/5cb15ec4612a854ce4513860
      //req.open("GET", "https://api.jsonbin.io/b/5c8e449be5cf2761bec4aa0d", true);
      // req.open("GET", "https://api.jsonbin.io/b/5cb1601f26ddc84cea3dc76e", true);
      // req.setRequestHeader("secret-key","$2a$10$TRXHifpRFh8/AE9G8UQ8IOHQMxP6UXUwHOJYxd1pasTC87YqvQMfe");
      // req.send()
      //return this.http.get('assets/data/data.json')
      return this.http.get('https://easybus-d1ec4.firebaseio.com/.json')
        .map(this.processData, this);
    //}
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
      

          if (session.tracks) {
            session.tracks.forEach((track: any) => {
              if (this.data.tracks.indexOf(track) < 0) {
                this.data.tracks.push(track);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(dayIndex: number, queryText = '', excludeTracks: any[] = [], segment = 'all') {
    return this.load().map((data: any) => {
      // this.load()
      // this.processData(data)
      console.log("data",data)
      let day = data.schedule[dayIndex];
      day.shownSessions = 0;

      //queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');

      queryText = queryText.replace(/,|\.|-/g, ' ');

      let queryWords = queryText.split(' - ').filter(w => !!w.trim().length);
      

     
      // var queryWords :string[];


      day.groups.forEach((group: any) => {
        group.hide = true;

        group.sessions.forEach((session: any) => {
          // check if this session should show or not
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            // if this session is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });
  }

  filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      
      queryWords.forEach((queryWord: string) => {
        
        if 
        //(session.name.toLowerCase().indexOf(queryWord) > -1) 
        (session.outward.indexOf(queryWord) > -1 || session.return.indexOf(queryWord) > -1) 
        {
          
          console.log(session.outward);
          matchesQueryText = true;
          

        }
        else
        {
          if
          //(session.id.toLowerCase().indexOf(queryWord) > -1)
          (session.id.indexOf(queryWord) > -1)
          {
            console.log(session.id)
            matchesQueryText = true;
          }
          else
          {
            
            // let arr = queryWord.split(' - ');
            // console.log(arr)
            if(session.outward.indexOf(queryWord) > -1)
            {
              matchesQueryText = true;
            }
         
          }
        }
      });
    } else {
    
      matchesQueryText = true;
    }

    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
     
    });
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getTracks() {
    return this.load().map((data: any) => {
      return data.tracks.sort();
    });
  }

  getMap() {
    return this.load().map((data: any) => {
      return data.map;
    });
  }

}
