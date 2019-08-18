import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { PaperComponent } from './component/paper/paper.component';
import { QuestionComponent } from './component/question/question.component'
import { CountdownModule } from 'ngx-countdown';
import { ResultComponent } from './component/result/result.component';
import { SlistComponent } from './component/slist/slist.component';
import { AuthInterceptor } from './interceptor/AuthInterceptor';
import { ErrorInterceptor } from './interceptor/ErrorInterceptor';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PaperComponent,
    QuestionComponent,
    ResultComponent,
    SlistComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, CountdownModule,FormsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
