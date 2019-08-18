import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { Pagination } from '../../class/Pagination'
import { User } from '../../class/User';
import { Paper } from '../../class/Paper'
import { formatDate } from '@angular/common';
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
  modalHeader: string;
  modalpasssword: string;

  @ViewChild(HeaderComponent) header: HeaderComponent;
  constructor() { }

  ngOnInit() {
    this.initPagination();
    console.log(this.header.loader);
    this.getAllUser();
     
  }
  initPagination() {
  this.initUserPagination();
  this.initPaperPagination();
  }
  initUserPagination(){
    this.pageForUser = new Pagination();
    this.pageForUser.first = 1;
    this.pageForUser.cur = 1;
    this.pageForUser.last = 5;
    this.pageForUser.range = 5;
    this.pageForUser.callbackfunc = "pageForUserFn";
  }
  initPaperPagination(){
    this.pageForPaper = new Pagination();
    this.pageForPaper.first = 1;
    this.pageForPaper.cur = 1;
    this.pageForPaper.last = 5;
    this.pageForPaper.range = 5;
    this.pageForPaper.callbackfunc = "pageForPaperFn";
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
  savePaper:Paper;
  editpaperDetail(paper: Paper) {
    this.modalHeader = "Edit " + paper.name;
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

  getAllUser() {
    //this.pageForUser.cur-1
    //after data


    var datatosend = { "pageNo": 1 };


    this.header.error = "";
    this.header.loader = true;
    this.header.dataService.getRsltData(datatosend, "logins").subscribe(data => {
    },
    error => {
      this.header.handleError(error);
    });
    this.header.dataService.getMtdData(datatosend, "users/" + (this.pageForUser.cur - 1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      if(data["count"]>0){

        this.pageForUser.first = 1;
        this.pageForUser.cur = data["page"];
        this.pageForUser.last = data["count"];
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
    this.header.loader = true;
    // this.header.dataService.getData(datatosend, "logins").subscribe(data => {
    // },
    // error => {
    //   this.handleError(error);
    // });
    this.header.dataService.getMtdData(datatosend, "paper/" + (this.pageForUser.cur - 1)).subscribe(data => {
      // this.router.navigate([this.returnUrl]);
      console.log(data);
      if(data["count"]>0){
        this.pageForPaper.first = 1;
        this.pageForPaper.cur = data["page"];
        this.pageForPaper.last = data["count"];
      }
      
      this.paper = data["content"];
      console.log(this.paper);

      this.header.loader = false;

    },
      error => {
        this.header.handleError(error);
        
      });
  }

}
