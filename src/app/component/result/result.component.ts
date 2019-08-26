
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Paper } from 'src/app/class/Paper';
import { Question } from 'src/app/class/Question';
import { Option } from 'src/app/class/Option';
import { HeaderComponent } from '../header/header.component';
import { MapUserQuestionChoice } from 'src/app/class/MapUserQuestionChoice';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  constructor(private elementRef:ElementRef) { }
  paper: Paper = new Paper();
  userid: number = 0;
   
  @ViewChild(HeaderComponent) header: HeaderComponent;
  notify: string="Paper Duration";
  progressValue: number = 0;
  progressWrongValue:number=0;
  startTime: number;
  notiFyTime: number;
  timerClass: string;

  question: Question[] = [];
  mapuserques:MapUserQuestionChoice[]=[];

  unsolvedBtnClass: string[] = ["btn-outline-primary", "fa-question"];
  traverseBtnClass: string[] = ["btn-outline-success", "fa-arrows"];
  solvedBtnClass: string[] = ["btn-outline-danger", "fa-pencil"];
  optionClass:string="alert-primary";
  ngOnInit() {
   
    if (localStorage.getItem("paper") != null) {
      this.paper = JSON.parse(localStorage.getItem("paper"));

    
       
    }else{
      this.header.router.navigateByUrl("/slist");
    }

  }

  ngAfterViewInit(){

    this.getquestionpaper(this.paper.id, this.userid)
  }

  marks:number;
  isNewPaper: boolean = false;
  current: number = 0;
  level:number[]=[0,0,0,0];
  getquestionpaper(paperId: number, userId: number) {
    
    console.log("heelo");
    
    this.header.dataService.getData({}, "getquestionpaperresult/" + paperId + "/" + this.header.loginuserid).subscribe((resp) => {
      //loader=false
      console.log(resp);
      

      if (resp.ques.length >0) { 
       // this.question=resp.ques;
        console.log(resp);
        this.marks= resp.mapuserpaper.marks ;
        if(this.marks==null)  this.header.router.navigateByUrl("/slist");
        
        
        for (let i = 1; i < 11; i++) {
          let question: Question = new Question();
          question.id=resp.ques[i-1].id;
          question.seq = i;
          question.fkPaperId = resp.ques[i-1].fkPaperId;
          question.opt = [];
          question.question = resp.ques[i-1].question;
          question.correctMark = resp.ques[i-1].correctMark;
          question.wrongMark = resp.ques[i-1].wrongMark;
          question.fkLevelDesc=this.fkLevelDesc(resp.ques[i-1].fkLevel)
          question.opt=resp.ques[i-1].opt;

          for (let j = 0; j < resp.ques[i-1].opt.length; j++) {
            resp.ques[i-1].opt[j].styleCss="alert-secondary"
            if(resp.ques[i-1].opt[j].isCorrectChoice){
              resp.ques[i-1].opt[j].styleCss="alert-info";
              if(resp.ques[i-1].choices.fkChoice==  resp.ques[i-1].opt[j].id ){
                resp.ques[i-1].opt[j].styleCss="alert-success";
                this.progressValue+=10;
                question.styleclass=this.traverseBtnClass;
                this.level[question.fkLevel]+=10;
               }
            } else if(resp.ques[i-1].choices.fkChoice==  resp.ques[i-1].opt[j].id ){
              resp.ques[i-1].opt[j].styleCss="alert-danger";
              question.styleclass=this.solvedBtnClass;
              this.progressWrongValue+=10;
            }
           
         
           

          

          }
 
  
          this.question.push(question);
        }
       
        this.current = 1;
   
        
      }

       
    },
      error => {
        if (error == "OK") {
          this.header.handleSuccess("Please login again!!");
        } else {
          this.header.handleError(error);
        }

        console.log(error);


      });
  }
   fkLevelDesc(id:number){
     switch(id){
       case 1: return "easy";
       case 2: return "medium";
       case 3: return "hard";
       default: return "";
     }
   }
  nextContinueBtn(q: Question, index: number) {
    
    this.nextContinue(q,index)
  }
  progressValueOnCreate() {
    let inte: number = 0;
    for (let q of this.question) {
      if (q.isValid) inte++;
    }
    this.progressValue = inte * 10;
  }
  nextContinue(q: Question, index: number) {
   
    if (index + 1 > 10) index = 0;

    this.current = index + 1;

    
  }

  
  

}
