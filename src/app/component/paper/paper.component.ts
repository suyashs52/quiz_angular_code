import { Component, OnInit } from '@angular/core';
import { Paper } from 'src/app/class/Paper';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  paper: Paper = new Paper();
  constructor() { }

  ngOnInit() {
    this.paper.totalQuestion=10;
  }

}
