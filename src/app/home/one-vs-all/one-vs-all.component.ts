import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MainService } from 'src/app/shared/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-one-vs-all',
  templateUrl: './one-vs-all.component.html',
  styleUrls: ['./one-vs-all.component.css']
})
export class OneVsAllComponent implements OnInit {
  @ViewChild('f') temForm: NgForm;
  @ViewChild('r') temForm2:NgForm;
  left=[];
  right=[];
  constructor(private mainService:MainService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }

  getLeftData(id):void{
    let data = {};
    this.mainService.getData(id)
      .subscribe(res => {
        let response = res['items'][0]
        data['left_subscribers'] = response.statistics.subscriberCount;
        data['left_video_count'] = response.statistics.videoCount;
        data['left_view_count'] = response.statistics.viewCount;
        data['left_earning'] = ((response.statistics.viewCount / 1000) * 2).toString();
        data['left_title'] = response.snippet.title;
        data['left_image'] = response.snippet.thumbnails.high.url;
        data['left_country'] = response.snippet.country;
        console.log(data);
        this.left.push(data);
        this.temForm.reset()

      })
  }


  leftSubmit(form:NgForm){
    this.left = [];
    if (form.value.uid){
      this.getLeftData(form.value.left_player)
    }else{
      this.mainService.getUID(form.value.left_player)
        .subscribe((res: any)=>{
          if(res?.items?.length > 0){
            this.getLeftData(res.items[0]['id'])
          }
        })
    }
  }

  deleteLeft(){
    this.left.pop();
  }

  getRightData(uid){
    let data = {};
    this.mainService.getData(uid)
      .subscribe(res => {
        let response = res['items'][0]
        data['right_subscribers'] = response.statistics.subscriberCount;
        data['right_video_count'] = response.statistics.videoCount;
        data['right_view_count'] = response.statistics.viewCount;
        data['right_earning'] = ((response.statistics.viewCount / 1000) * 2).toString();
        data['right_title'] = response.snippet.title;
        data['right_image'] = response.snippet.thumbnails.high.url;
        data['right_country'] = response.snippet.country;
        console.log(data);
        this.right.unshift(data);
        this.temForm2.reset()

      })
  }

  rightSubmit(form:NgForm){
    console.log(form.value);
    if (form.value.right_uid) {
      this.getRightData(form.value.right_player)
    } else {
      this.mainService.getUID(form.value.right_player)
        .subscribe((res: any) => {
          if (res?.items?.length > 0) {
            this.getRightData(res.items[0]['id'])
          }
        })
    }
  }

  startBattle(){
    localStorage.setItem('left',JSON.stringify(this.left))
    localStorage.setItem('right',JSON.stringify(this.right))
    this.router.navigate(['battle'])
  }

  deleteRight(index){
    console.log(index);
    this.right.splice(index,1);
  }
}
