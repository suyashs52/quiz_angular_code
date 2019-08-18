import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { PaperComponent } from './component/paper/paper.component';
import { QuestionComponent } from './component/question/question.component';
import { ResultComponent } from './component/result/result.component';
import { SlistComponent } from './component/slist/slist.component';
import { AuthGuard } from './auth.guard';

const url = environment.URL;
const routes: Routes = [{ path: '', redirectTo: url + 'login', pathMatch: 'full',canActivate: [AuthGuard] },
{ path: url + 'login', component: LoginComponent },
{ path: url + 'result', component: ResultComponent,canActivate: [AuthGuard] },
{ path: url + 'question', component: QuestionComponent,canActivate: [AuthGuard] },
{ path: url + 'paper', component: PaperComponent,canActivate: [AuthGuard] },
{ path: url + 'slist', component: SlistComponent,canActivate: [AuthGuard] },
{ path: url + 'signup', component: SignupComponent,canActivate: [AuthGuard] },
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
