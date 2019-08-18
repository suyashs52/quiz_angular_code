import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private router: Router) { }
  returnUrl: string;
  loader: boolean = false;
  error: string;
  showError:boolean;
  username:string;
  password:string="";
  ngOnInit() {
    this.dataService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // get return url from route pa
  }

  getLoginDetails() {
    var datatosend = {};
    
    datatosend["username"] = this.username;
    datatosend["credential"] = this.password;
    this.error="";
    this.loader=true;
    this.dataService.loginData(datatosend, "login").subscribe(data => {
    this.router.navigate([this.returnUrl]);
    console.log(data);
    this.loader = false;
    
    },
      error => {
       
        this.loader = false;
        this.showError=false;
        console.log(error);
        this.showError=true;
        this.error = error;
        this.password="";
        this.username="";
        window.scroll(0,0);
        setTimeout(() => {
          this.showError=false;
         
        }, 10000)
        
      });
  }
  setSignUpDetails() {
    var datatosend = {
      "username": "suys",
      "name": "suyash",
      "credential": "Password",
      "password": "Password@123",
      "phone": "8794785959",
      "role": "ADMIN",
      "createDate": new Date().toDateString,// "1999-04-04",
      "createdBy": "admin"

    };


    this.dataService.getData(datatosend, "signup").subscribe((resp) => {
      //loader=false
      console.log(resp);

      console.log(resp.headers.has('token'));

      console.log(resp.headers.get("token"));

    });
  }

}
