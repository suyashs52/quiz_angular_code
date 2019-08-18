import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  loginData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');

    // let csrf: string = window["_csrf"];
    // if (csrf != null && csrf.length > 0) {
    //   headers = headers.append("header", csrf);
    // }
   
    return this.httpClient.post<any>(environment.apiURL + url, dataToSend,
       { headers: headers,observe: 'response' }) .pipe(map(user => {
        console.log(user);
        
        if (user && user.body.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.body));
        }

        return user;
    }));
  }

  logout(){
    console.log("logout");
    localStorage.removeItem('user');
    
  }

  getMtdData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
   headers= headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.get<any>(environment.apiURL + url, dataToSend)
  }

  getData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
   headers= headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.post<any>(environment.apiURL + url, dataToSend, { headers: headers, responseType: 'json' })
  }

  getRsltMtdData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
   headers= headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.get<any>(environment.resultApiURL + url, dataToSend)
  }

  getRsltData(dataToSend: any, url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
   headers= headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
    let csrf: string = window["_csrf"];
    if (csrf != null && csrf.length > 0) {
      headers = headers.append("header", csrf);
    }
    return this.httpClient.post<any>(environment.resultApiURL + url, dataToSend, { headers: headers, responseType: 'json' })
  }
}
