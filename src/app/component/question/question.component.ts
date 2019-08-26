import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { Paper } from 'src/app/class/Paper';
import { Question } from 'src/app/class/Question';
import { Option } from 'src/app/class/Option';
import { HeaderComponent } from '../header/header.component';
import { MapUserQuestionChoice } from 'src/app/class/MapUserQuestionChoice';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }
  paper: Paper = new Paper();
  userid: number = 0;
  config: any = { leftTime: 10, notify: [2, 5] };
  @ViewChild('countdown') counter: CountdownComponent;
  @ViewChild(HeaderComponent) header: HeaderComponent;
  notify: string;
  progressValue: number = 0;
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
    this.config = { leftTime: 60 * 1, notify: [Math.floor(60 * 1 * 0.25)] };
    // this.notiFyTime=60*1;//this.config.leftTime;
  
 
    if(!(localStorage.getItem("paperMarks")=="" || localStorage.getItem("paperMarks")==this.paper.marks.toString())){
      this.header.router.navigateByUrl("/result");
    }


    if (localStorage.getItem("paper") != null) {
      this.paper = JSON.parse(localStorage.getItem("paper"));

      this.config = { leftTime: 60 * this.paper.totalTime, notify: [Math.floor(60 * this.paper.totalTime * 0.25)] };
      this.notiFyTime = 60 * this.paper.totalTime;
      console.log(this.config.notify[0]);
      console.log(this.notiFyTime);

      if (localStorage.getItem("userid") != null) {
        this.userid = Number.parseInt(localStorage.getItem("userid"));
      }
      this.getquestionpaper(this.paper.id, this.userid)
    }else{
      this.header.router.navigateByUrl("/slist");
    }

    //this.counter.restart();
  }
  isNewPaper: boolean = false;
  current: number = 0;
  getquestionpaper(paperId: number, userId: number) {

    var datatosend = {

      "paperId": paperId,
      "userId": userId

    };


    this.header.dataService.getData(datatosend, "getquestionpaper/" + paperId + "/" + userId).subscribe((resp) => {
      //loader=false
      console.log(resp);
      

      if (resp.ques.length == 0) {

        if (this.header.isAdmin) {
          this.isNewPaper = true;
        }
        for (let i = 1; i < 11; i++) {
          let question: Question = new Question();
          question.seq = i;
          question.fkPaperId = this.paper.id;
          question.opt = [];
          question.question = "Question " + i;//remove
          for (let j = 1; j < 5; j++) {
            let option = new Option();
            option.description = "option " + j;  //remove

            question.opt.push(option)
          }
          question.opt[2].isCorrectChoice = true; //remove

          this.question.push(question);
        }
        this.question[0].styleclass = this.traverseBtnClass;
        this.current = 1;
      }else{
       // this.question=resp.ques;
        console.log(resp);

        for (let i = 1; i < 11; i++) {
          let question: Question = new Question();
          question.id=resp.ques[i-1].id;
          question.seq = i;
          question.fkPaperId = resp.ques[i-1].fkPaperId;
          question.opt = [];
          question.question = resp.ques[i-1].question;
          question.correctMark = resp.ques[i-1].correctMark;
          question.wrongMark = resp.ques[i-1].wrongMark;
          question.isValid=false;
          for (let j = 1; j < 5; j++) {
            let option = new Option();
            option.description =  resp.ques[i-1].opt[j-1].description;
            option.id= resp.ques[i-1].opt[j-1].id;
            question.opt.push(option)
          }
           
  
          this.question.push(question);
        }
        this.question[0].styleclass = this.traverseBtnClass;
        this.current = 1;
  
 
        
      }

      // this.header.handleSuccess("save successfully.");
    },
      error => {
        if (error == "OK") {
          this.header.handleSuccess("user save successfully");
        } else {
          this.header.handleError(error);
        }

        console.log(error);


      });
  }
  saveQuestionPaper() {
    var datatosend = [];
    this.question;
    for (let i = 0; i <10; i++) {
      if (this.question[i].isValid) {
        let data = {};
        for (let q in this.question[i]) {
          data[q] = this.question[i][q];
        }
        datatosend.push(data);
      } else {
        this.header.handleError("all validation not full filled! click on continue button check question>"+(i+1));
        return;
      }
    }
    var d={ques:datatosend,paper:this.paper}
     
     
    console.log(datatosend);
 

    this.header.dataService.getData(d, "savequestionpaper").subscribe((resp) => {
      //loader=false
      console.log(resp);
      if (resp.ques.length == 0) { }

      this.header.handleSuccess("save successfully.");
      this.header.router.navigateByUrl("/slist");
    },
      error => {
        if (error == "OK") {
          this.header.handleSuccess("save successfully");
        } else {
          this.header.handleError(error);
        }

        console.log(error);


      });
  }
  
  optionClick(q:Question,o:Option){
    console.log("click");
    
    for (let ot of q.opt) {
      ot.isCorrectChoice = false;
      ot.styleCss="alert-secondary"
    }
    o.isCorrectChoice = true;
    o.styleCss=this.optionClass;
    q.fkCorrectChoice=o.id;
    if(!q.isValid){
      q.isValid=true;
      this.progressValue+=10;
      q.styleclass=this.solvedBtnClass;

    }
    
  }
  nextContinueBtn(q: Question, index: number) {
    let found: boolean = false;
    if (q.question.length < 3) {
      this.header.handleError("fill question description!")
      return;
    }
    if (q.correctMark < 1) {
      this.header.handleError("fill correct mark !")
      return;
    }
    for (let ot of q.opt) {
      if (ot.description == "") {
        this.header.handleError("fill all options!")
        return;
      }
      if (ot.isCorrectChoice == true) {
        found = true;
        break;
      }

    }

    if (found) {
      q.isValid = true;
      found = false;
      for (let i = index; i < 10; i++) {
        if (this.question[i].styleclass != this.traverseBtnClass) {
          found = true; this.current = i;

          break;
        }
      }
      if (!found) {
        for (let i = 0; i < index; i++) {
          if (this.question[i].styleclass != this.traverseBtnClass) {
            found = true; this.current = i; break;
          }
        }
      }
      if (!found) {
        this.current = 1;
      }

      this.question[this.current].styleclass = this.traverseBtnClass;

      if (this.current == 10) this.current = 0;
      this.current++;
      if (!found) {
        this.current = 1;
      }

    }
    else this.header.handleError("mark a correct option!");

    this.progressValueOnCreate();
  }
  progressValueOnCreate() {
    let inte: number = 0;
    for (let q of this.question) {
      if (q.isValid) inte++;
    }
    this.progressValue = inte * 10;
  }
  nextContinue(q: Question, index: number) {
    console.log(index);

    if (index + 1 > 10) index = 9;

    this.current = index + 1;

    if(!this.question[index].isValid)
    this.question[index].styleclass = this.traverseBtnClass;

  }

   reviewQues(d:Question){
      d.isReview=true;
   }
  onStart() {
    this.notify = 'Time Left';
  }
  onFinished() {
    this.notify = 'TImes Up!';
    this.saveSubmition();
  }
  onNotify(time: number) {
    this.notiFyTime = Math.floor(time / 1000);
    console.log(this.config.notify[0]);
    console.log(this.notiFyTime);
    // notiFyTime>config.notify[0]
    this.unsolvedBtnClass[0] = "btn-outline-warning"
    this.notify = `${this.notiFyTime} mins left`;
    this.timerClass = "l1-txt4";
  }
  ngAfterViewInit() {
    this.elementRef .nativeElement.querySelector('#endTest')
                                  .addEventListener('click', this.saveSubmition.bind(this));
  }

  saveSubmition(){
    console.log(this.question);
    //mapuserques
    this.mapuserques=[];
console.log(this.header.loginuserid);

    for(let q of this.question){
      if(q.isValid){
        let mapuser=new MapUserQuestionChoice();
        mapuser.fkUser=this.header.loginuserid;
        mapuser.fkPaper=this.paper.id;

        mapuser.fkQuestion=q.id;
        mapuser.fkChoice=q.fkCorrectChoice;

        this.mapuserques.push(mapuser);
      }
    }
    if(this.mapuserques.length<3){
      this.header.handleError("please answer at least 30% questions");
      return;
    }
    var datatosend={
      muqc:this.mapuserques
    }
    this.header.dataService.getData(datatosend, "savetestresult").subscribe((resp) => {
      //loader=false
      console.log(resp);
     // if (resp.ques.length == 0) { }

      this.header.handleSuccess("save successfully.");
      this.header.router.navigate(["/result"]);
    },
      error => {
        if (error == "OK") {
          this.header.handleSuccess("save successfully");
        } else {
          this.header.handleError(error);
        }

        console.log(error);


      });
    
  }

}
