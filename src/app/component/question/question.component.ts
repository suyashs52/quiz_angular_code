import { Component, OnInit,ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() { }
  config: any = { leftTime: 10, notify: [2, 5] };
  @ViewChild('countdown') counter: CountdownComponent;
  notify: string;
  ngOnInit() {
    this.config={ leftTime: 50, notify: [20] };
    //this.counter.restart();
  }
  onStart() {
    this.notify = 'Time Left';
  }
  onFinished() {
    this.notify = 'TImes Up!';
  }
  onNotify(time: number) {
    this.notify = `${time} mins left`;
  }

}
