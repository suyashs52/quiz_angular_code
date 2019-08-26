import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { Pagination } from '../../class/Pagination'
import { User } from '../../class/User';
import { Paper } from '../../class/Paper'
import { formatDate } from '@angular/common';
import { MapUserPaper } from 'src/app/class/MapUserPaper';
@Component({
  selector: 'app-slist',
  templateUrl: './slist.component.html',
  styleUrls: ['./slist.component.css']
}) 
export class SlistComponent implements OnInit {

  public pageForUser: Pagination;
  public pageForPaper: Pagination;
  public user: User[] = [];
  public paper: Paper[] = [];
  public mup:MapUserPaper[]=[];
  modalHeader: string;
  modalpasssword: string;

  @ViewChild(HeaderComponent) header: HeaderComponent;
  constructor() { }

  ngOnInit() {
    this.initPagination();
    console.log(this.header.loader);
    this.header.loader = true;
    
     
  }
  isAdmin:boolean=false;
  ngAfterViewInit(){
    console.log(this.header.loginrole);
    if(this.header.isAdmin){
      this.getAllUser();
    }else{
      document.querySelector("#nav-profile-tab").classList.value="nav-item nav-link active";
      document.querySelector("#nav-profile").classList.value= "tab-pane fade show active";

     
      this.getAllPaper();
    }
   
    
  }
  initPagination() {
  this.initUserPagination();
  this.initPaperPagination();
  }
  initUserPagination(){
    this.pageForUser = new Pagination();
    this.pageForUser.first = 1;
    this.pageForUser.cur = 1;
    this.pageForUser.last = 1;
    this.pageForUser.range = 5;
    this.pageForUser.callbackfunc = "pageForUserFn";
  }
  initPaperPagination(){
    this.pageForPaper = new Pagination();
    this.pageForPaper.first = 1;
    this.pageForPaper.cur = 1;
    this.pageForPaper.last = 1;
    this.pageForPaper.range = 5;
    this.pageForPaper.callbackfunc = "pageForPaperFn";
  }
  createPaper(){
    localStorage.removeItem("paper");
    localStorage.removeItem("paperId");
    this.header.router.navigate(["/paper"]);
  }
  pageForUserFn(index: number, val: string) {
    switch (val) {
      case 'p': this.pageForUser.getPrev();
        this.getAllUser();
        break;
      case 'n': this.pageForUser.getNext();
        this.getAllUser();
        break;
      case 'm': this.pageForUser.getCurrent(index);
        this.getAllUser();
        break;
    }
  }
  pageForPaperFn(index: number, val: string) {
    switch (val) {
      case 'p': this.pageForPaper.getPrev();
        this.getAllPaper();
        break;
      case 'n': this.pageForPaper.getNext();
        this.getAllPaper();
        break;
      case 'm': this.pageForPaper.getCurrent(index);
        this.getAllPaper();
        break;
    }
  }

  userdetails(event) {

    let dom: any = document.querySelectorAll('a.nav-item');
    console.log(dom);
    
    for (let d = 0; d < dom.length; d++) {
      console.log(d);

      dom[d].className = "nav-item nav-link";
    }
    event.target.class = "nav-item nav-link active";
    this.getAllUser();

  }
  saveUser:User;
  edituserDetail(user: User) {
    this.modalHeader = "Edit " + user.name;
    console.log(user);
    this.saveUser=user;
   
    
  }
  savePaper:Paper=new Paper();
  editpaperDetail(paper: Paper) {
    this.modalHeader = "Edit " + paper.name;
    console.log(paper);
    this.savePaper=paper;
   
    
  }
  navpaperDetail(paper: Paper) {
   localStorage.setItem("paperId",paper.id.toString());
   localStorage.setItem("paperMarks",paper.marks==null?"":paper.marks.toString());
   this.header.router.navigate(['/paper']);
    console.log(paper);
    this.savePaper=paper;
   
    
  }
  

  
  saveuserDetail(){
    var date= formatDate(new Date(),'yyyy-MM-dd','en');
    var datatosend = {
      "id":this.saveUser.id,
      "username":  this.saveUser.username,
      "name":  this.saveUser.name,
      "credential": this.modalpasssword,
      "password": "Passwd@123",
      "phone":  this.saveUser.phone,
      "role":  this.saveUser.role,
      "createDate":date,// | asdf,// "1999-04-04",
      "createdBy": "admin"

    };


    this.header.dataService.getData(datatosend, "updateuser").subscribe((resp) => {
      //loader=false
      this.header.handleSuccess("save successfully.");
    },
    error => {
      if(error=="OK"){
        this.header.handleSuccess("password changed successfully.");
      }else{
        this.header.handleError(error);
      }
    
      console.log(error);
      
    
    });
    this.modalpasssword="";
  }

  questionList(event) {
    let dom: any = document.querySelectorAll('a.nav-item');
    for (let d = 0; d < dom.length; d++) {
      console.log(d);

      dom[d].className = "nav-item nav-link";
    }
    event.target.class = "nav-item nav-link active";
    console.log(event.target);
    this.getAllPaper();
  }

  
  savepaperDetail(){
    var date= formatDate(new Date(),'yyyy-MM-dd','en');
    var datatosend = {
      "id":this.savePaper.id,
       
      "name":  this.savePaper.name,
      "desc": this.savePaper.desc,
      
      "totalTime":  this.savePaper.totalTime,
      "totalQuestion":  this.savePaper.totalQuestion,
      "createDate":date,// | asdf,// "1999-04-04",
      "createdBy": "admin"

    };


    this.header.dataService.getData(datatosend, "updatepaper").subscribe((resp) => {
      //loader=false
      this.header.handleSuccess("save successfully.");
    },
    error => {
      if(error=="OK"){
        this.header.handleSuccess("paper record updated successfully.");
      }else{
        this.header.handleError(error);
      }
    
      console.log(error);
      
    
    });
    
  }
  getAllUser() {
    //this.pageForUser.cur-1
    //after data


    var datatosend = { "pageNo": 1 };


    this.header.error = "";
   
    
    this.header.dataService.getMtdData(datatosend, "users/" + (this.pageForUser.cur - 1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      if(data["count"]>0){

         
        this.pageForUser.last = data["page"];
        this.pageForUser.range = data["count"];
        this.user = data["content"];
      }
     
      console.log(this.user);

      this.header.loader = false;

    },
      error => {
        this.header.handleError(error);
        
      });
  }

  getAllPaper() {
    //this.pageForUser.cur-1
    //after data


    var datatosend = { "pageNo": 1 }; 


    this.header.error = "";
    
    // this.header.dataService.getData(datatosend, "logins").subscribe(data => {
    // },
    // error => {
    //   this.handleError(error);
    // });
    this.paper=[];
    this.header.dataService.getMtdData(datatosend, "paper/" + (this.pageForUser.cur - 1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      if(data["count"]>0){
        
        this.pageForPaper.last = data["page"];
        this.pageForPaper.range = data["count"];
        this.paper = data["content"];
        this.mup=data["mup"];

        for(let p of this.paper){
          for(let m of this.mup){
            if(m.fkPaper==p.id && m.marks!=null){
              p.marks=m.marks;

            }
          }
        }

      }
      
      
      console.log(this.paper);

      this.header.loader = false;

    },
      error => {
        this.header.handleError(error);
        
      });
  }

}
