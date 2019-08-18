import { Component, OnInit,ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Paper } from 'src/app/class/Paper';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() { }
  paper:Paper=new Paper();
  config: any = { leftTime: 10, notify: [2, 5] };
  @ViewChild('countdown') counter: CountdownComponent;
  notify: string;
 
  startTime:number;
  notiFyTime:number;
  timerClass:string;

   unsolvedBtnClass:string[]=["btn-outline-primary","fa-question"];
  ngOnInit() {
    this.config={ leftTime: 60*1, notify: [Math.floor(60*1*0.25)] };
   // this.notiFyTime=60*1;//this.config.leftTime;
   
    

    this.timerClass="l1-txt3";
    if(localStorage.getItem("paper")!=null){
      this.paper=JSON.parse(localStorage.getItem("paper"));
      
      this.config={ leftTime: 60*this.paper.totalTime, notify: [Math.floor(60*this.paper.totalTime*0.25)] };
      this.notiFyTime=60*this.paper.totalTime;
      console.log(this.config.notify[0]);
      console.log(this.notiFyTime);
    }
    
    //this.counter.restart();
  }


  onStart() {
    this.notify = 'Time Left';
  }
  onFinished() {
    this.notify = 'TImes Up!';
  }
  onNotify(time: number) {
    this.notiFyTime=Math.floor(time/1000);
    console.log(this.config.notify[0]);
    console.log(this.notiFyTime);
   // notiFyTime>config.notify[0]
   this.unsolvedBtnClass[0]="btn-outline-danger"
    this.notify = `${this.notiFyTime} mins left`;
    this.timerClass="l1-txt4";
  }

}
