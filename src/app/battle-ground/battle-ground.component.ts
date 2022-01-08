import { Component, OnInit, Renderer2, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-battle-ground',
  templateUrl: './battle-ground.component.html',
  styleUrls: ['./battle-ground.component.css']
})
export class BattleGroundComponent implements OnInit {

  left=[];

  table_limit = 5


  right=[];
  right_top;
  right_down=[];
  right_counter = 0;
  right_combined_subscribers:string = "0";
  right_combined_earnings:string = "0"
  TIME_LIMIT: number;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
  timePassed:number;
  timeLeft:any;
  timerInterval = null;
  FULL_DASH_ARRAY = 283;
  circleDashArray:string;
  @ViewChild('dashArray') dashArray: ElementRef;
  constructor(private renderer: Renderer2) { 
    
  }

  

  formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds:any = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

startTimer(){
  this.timerInterval = setInterval(() => {

    // The amount of time passed increments by one
    this.timePassed = this.timePassed += 1;
    this.timeLeft = this.TIME_LIMIT - this.timePassed;
    if(this.timeLeft == 0){
      this.right_counter++
      this.timePassed = -1;
      if(this.right_counter > 0 && this.right_top){
        this.right_down.push(this.right_top);
        this.right_combined_earnings = (+this.right_combined_earnings + +this.right_top.right_earning).toString();
        this.right_combined_subscribers = (+this.right_combined_subscribers + +this.right_top.right_subscribers).toString();
        // this.right_combined_subscribers += +this.right_top.right_subscribers;
        console.log(this.right_down);
      }
      if(this.right.length > 0){
        this.right_top = this.right.pop()
      }else{
        this.right_top = ""
        this.table_limit = 9
      }
    }

    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML = this.formatTimeLeft(this.timeLeft);
    this.setCircleDasharray();
  }, 1000);
}

calculateTimeFraction() {
  let rawTimeFraction = (this.timeLeft / this.TIME_LIMIT);
  return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
}

  setCircleDasharray() {
    this.circleDashArray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
      this.renderer.setAttribute(this.dashArray.nativeElement,'stroke-dasharray',this.circleDashArray)
  }

  ngOnInit(): void {
    this.TIME_LIMIT = 1;

    // Initially, no time has passed, but this will count up
    // and subtract from the TIME_LIMIT
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    setTimeout(()=>{
      this.startTimer();
    },8000)
    this.left = JSON.parse(localStorage.getItem('left'));
    this.right = JSON.parse(localStorage.getItem('right'));
    this.right_top = this.right.pop()


  }

}
