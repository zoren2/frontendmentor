/* Service imports */
import { HttpClientModule } from '@angular/common/http';

/* Angular Core */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material Imports */
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatIconModule } from '@angular/material/icon'; 

/* Forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceComponent } from './invoice/invoice.component';



@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    InvoiceViewComponent,
    InvoiceItemComponent,
    InvoiceEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
