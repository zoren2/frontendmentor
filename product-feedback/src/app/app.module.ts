import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavAddFeedbackComponent } from './nav-add-feedback/nav-add-feedback.component';
import { FeedbackCardComponent } from './feedback-card/feedback-card.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule],
  declarations: [AppComponent, HomeComponent, NavMenuComponent, NavAddFeedbackComponent, FeedbackCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
