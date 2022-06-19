import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getUID(name:string){
    return this.http.get("https://yt.lemnoslife.com/channels", {
      params: {
        part:'snippet',
        forUsername: name
      }
    })
  }

  getData(id){
    let x = {
        part: ['statistics','contentDetails','snippet'],
        // key: YOUR_API_HERE
        id: id
      }
    
   return this.http.get("https://www.googleapis.com/youtube/v3/channels",{
      params:x
    })
  }
}
