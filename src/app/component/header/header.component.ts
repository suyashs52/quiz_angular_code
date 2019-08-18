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
  showSuccess:boolean;
  success:string;
  constructor(public dataService: DataService, private route: ActivatedRoute,
    private router: Router) { }
  getDataService: DataService;
  loginuser:string;
  loginrole:string;
  ngOnInit() {
  
    this.getDataService = this.dataService;

   let data:any=JSON.parse(localStorage.getItem("user"));
   this.loginuser=data.loginuser;
   this.loginrole=data.role;
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
