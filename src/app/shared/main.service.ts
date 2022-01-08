import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getData(name,uid){
    let x = {};
    if(uid){
      x = {
        part: ['statistics','contentDetails','snippet'],
        key: "AIzaSyB3RBHJWXrBnjTnmLJC7cdEv98QoE8fH5U",
        id: name
      }
    }else{
      x = {
        part: ['statistics', 'contentDetails', 'snippet'],
        key: "AIzaSyB3RBHJWXrBnjTnmLJC7cdEv98QoE8fH5U",
        forUsername: name,
      }
    }
   return this.http.get("https://www.googleapis.com/youtube/v3/channels",{
      params:x
    })
  }
}
