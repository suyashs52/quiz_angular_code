import { Component, OnInit,ViewChild } from '@angular/core';
import { Paper } from 'src/app/class/Paper';
import { formatDate } from '@angular/common';
import { HeaderComponent } from '../header/header.component'
@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  savePaper: Paper = new Paper();
  paperId:string;
  constructor() { }
   displayEdit:boolean=false;
  ngOnInit() {
    this.savePaper.totalQuestion=10;
    this.paperId=localStorage.getItem("paperId");
    if(this.paperId==null){
      this.displayEdit=true;
     
    }else{
      //localStorage.removeItem("paperId");
      this.navquesDetail();
    }
  }
  navquesDetail(){
    
    var datatosend = { };
    let paperid:number=Number.parseInt(this.paperId);

    this.header.dataService.getMtdData(datatosend, "getpaper/"+paperid).subscribe((resp) => {
      //loader=false
      console.log(resp);
      this.savePaper=resp;
      localStorage.setItem("paper",JSON.stringify(resp));
 
      
    },
    error => {
       
        this.header.handleError(error);
     
    
      console.log(error);
      
    
    });
  }
  
  savepaperDetail(st:string){
    var date= formatDate(new Date(),'yyyy-MM-dd','en');
    var datatosend = {
       
       
      "name":  this.savePaper.name,
      "desc": this.savePaper.desc,
      
      "totalTime":  this.savePaper.totalTime,
      "totalQuestion":  this.savePaper.totalQuestion,
      "createDate":date,// | asdf,// "1999-04-04",
      "createdBy": "admin"

    };


    this.header.dataService.getData(datatosend, "createpaper").subscribe((resp) => {
      //loader=false
      this.header.handleSuccess("save successfully.");
      console.log(resp);
      if(st=="go"){
        localStorage.setItem("paper",JSON.stringify(this.savePaper));
        this.header.router.navigate(["/question"]);
      }else{
        this.header.router.navigate(["/slist"]);
      }
      
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

}
