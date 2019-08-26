import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loader: boolean = false;
  error: string;
  showError: boolean;
  showSuccess: boolean;
  success: string;
  public loginuserid: number = 0;
  isAdmin: boolean = false;
  constructor(public dataService: DataService, protected route: ActivatedRoute,
    public router: Router) { }
  getDataService: DataService;
  loginuser: string;
  loginrole: string;

  ngOnInit() {

    this.getDataService = this.dataService;

    let data: any = JSON.parse(localStorage.getItem("user"));
    this.loginuser = data.loginuser;
    
    this.loginuserid = data.userid;
 
    
    
    if(data.role.indexOf("ADMIN")>-1){
      this.loginrole="ADMIN";
      this.isAdmin=true;
    }else{
      this.loginrole="USER";

    }
   
    
    if(this.router.url=="/question"){
      document.querySelector("#endTest")["style"].display="block";
    }else{
      document.querySelector("#endTest")["style"].display="none";
    }
   

  }

  logout() {
    this.dataService.logout();
    location.reload(true);
  }


  handleSuccess(success: any) {
    this.loader = false;
    this.showSuccess = true;
    this.success = success;

    window.scroll(0, 0);
    setTimeout(() => {
      this.showSuccess = false;

    }, 10000)


  }

  handleError(error: any) {
    this.loader = false;
    this.showError = false;
    console.log(error);
    this.showError = true;
    this.error = error;

    window.scroll(0, 0);
    setTimeout(() => {
      this.showError = false;

    }, 10000)


  }
}
