import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceComponent } from './invoice/invoice.component';

/* Material Imports */
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    ViewInvoiceComponent,
    InvoiceItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
