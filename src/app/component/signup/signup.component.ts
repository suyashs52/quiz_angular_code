import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../class/User'
import { formatDate } from '@angular/common';
import { HeaderComponent } from '../header/header.component'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  saveUser: User = new User();

  @ViewChild(HeaderComponent) header: HeaderComponent;
  constructor() { }

  ngOnInit() {
  }


  saveuserDetail() {
    if (this.saveUser.password !== this.saveUser.vpassword) {
      this.header.handleError("password mismatch");
      return;
    }


    var date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    var datatosend = {

      "username": this.saveUser.username,
      "name": this.saveUser.name,
      "credential": this.saveUser.password,
      "password": "Passwd@123",
      "phone": this.saveUser.phone,
      "role": this.saveUser.role,
      "createDate": date,// | asdf,// "1999-04-04",
      "createdBy": "admin"

    };


    this.header.dataService.getData(datatosend, "signup").subscribe((resp) => {
      //loader=false
      this.header.handleSuccess("save successfully.");
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

}
