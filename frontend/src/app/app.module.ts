import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityComponent } from './components/community/community.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PeopleComponent } from './components/people/people.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { IndexComponent } from './components/index/index.component';

import { FormsModule } from '@angular/forms';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { FeedbackComponent } from './components/dashboard/feedback/feedback.component';
import { RequestItemComponent } from './components/dashboard/requests/request-item/request-item.component';
import { FeedbackItemComponent } from './components/dashboard/feedback/feedback-item/feedback-item.component'

@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent,
    DashboardComponent,
    MessagesComponent,
    PeopleComponent,
    SettingsComponent,
    SignupComponent,
    TransactionsComponent,
    IndexComponent,
    RequestsComponent,
    FeedbackComponent,
    RequestItemComponent,
    FeedbackItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
