import { Component, OnInit, Renderer2, Input, ElementRef, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-battle-ground-two',
  templateUrl: './battle-ground-two.component.html',
  styleUrls: ['./battle-ground-two.component.css']
})
export class BattleGroundTwoComponent implements OnInit {

  left = [];
  left_top;
  left_down = [];
  left_counter = 0;
  left_combined_subscribers: string = "0";
  left_combined_earnings: string = "0";
  left_graph:number[];

  left_table_limit=4;

  right_table_limit = 4;

  right = [];
  right_top;
  right_down = [];
  right_counter = 0;
  right_combined_subscribers: string = "0";
  right_combined_earnings: string = "0";
  right_graph:number[];
  TIME_LIMIT: number;

  // Initially, no time has passed, but this will count up
  // and subtract from the TIME_LIMIT
  timePassed: number;
  timeLeft: any;
  timerInterval = null;
  FULL_DASH_ARRAY = 283;
  circleDashArray: string;
  @ViewChild('dashArray') dashArray: ElementRef;
  constructor(private renderer: Renderer2) {

  }
  public barChartOptions: ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          fontColor: '#1b262c',
          fontSize: 20,
          beginAtZero: true,
          display: false,
          stepSize: 1,
          fontFamily: "PT Sans"
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
        }
      }]
    },

  };

  public barChartLabels: Label = ['Total Earnings'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false
  public barChartData: ChartDataSets[] = [
    { data: [0, 0], label: 'Left', backgroundColor: "#cf1b1b" },
    { data: [0, 0], label: 'Right', backgroundColor: "#00b7c2" }
  ];



  formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds: any = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {

      // The amount of time passed increments by one
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      if (this.timeLeft == 0) {
        this.right_counter++;
        this.left_counter++;
        this.timePassed = -1;
        if (this.right_counter > 0 && this.right_top) {

          this.right_down.push(this.right_top);
          this.right_combined_earnings = (+this.right_combined_earnings + +this.right_top.right_earning).toString();
          this.right_combined_subscribers = (+this.right_combined_subscribers + +this.right_top.right_subscribers).toString();
          this.right_graph[0] = parseInt(this.right_combined_earnings)
          this.barChartData[1].data = this.right_graph.slice()
        
        }

        if (this.left_counter > 0 && this.left_top){

          this.left_down.push(this.left_top);
          this.left_combined_earnings = (+this.left_combined_earnings + +this.left_top.left_earning).toString();
          this.left_combined_subscribers = (+this.left_combined_subscribers + +this.left_top.left_subscribers).toString();
          this.left_graph[0] = parseInt(this.left_combined_earnings);
          console.log(this.left_graph)
          this.barChartData[0].data = this.left_graph.slice();
        }

        if (this.right.length > 0) {
          this.right_top = this.right.pop()
        } else {
          this.right_top = ""
          this.right_table_limit = 7
          
        }
        
        if (this.left.length > 0) {
          this.left_top = this.left.pop();
        } else {
          this.left_top = "";
          this.left_table_limit = 7
          if (!this.timeLeft) {
            return clearInterval(this.timerInterval)
          }
        }

        
      }

      // The time left label is updated
      if(this.formatTimeLeft(this.timeLeft)){
        document.getElementById("base-timer-label").innerHTML = this.formatTimeLeft(this.timeLeft);
      }
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
    this.renderer.setAttribute(this.dashArray.nativeElement, 'stroke-dasharray', this.circleDashArray)
  }
  

  ngOnInit(): void {
    this.TIME_LIMIT = 5;
    // Initially, no time has passed, but this will count up
    // and subtract from the TIME_LIMIT
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    setTimeout(() => {
      this.startTimer();
    }, 2000)
    this.left = JSON.parse(localStorage.getItem('left'));
    this.left_top = this.left.pop()
    this.left_graph = [0,0]

    this.right = JSON.parse(localStorage.getItem('right'));
    this.right_top = this.right.pop();
    this.right_graph = [0,0]
  }

}
