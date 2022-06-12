import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
