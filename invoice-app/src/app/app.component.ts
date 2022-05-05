import { Component, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoice-app';
  hasInvoices: boolean = true;
  editingInvoice: boolean = false;
  viewingInvoice: boolean = false;

  toggleHasInvoice(): void {
    this.hasInvoices = !this.hasInvoices;
  }

  toggleEdit(): void {
    this.editingInvoice = !this.editingInvoice;
  }

  toggleViewingInvoice(): void {
    this.viewingInvoice = !this.viewingInvoice;
  }

  // backToMain(event: string) {
  //   if (event == 'back-to-main') {
  //     this.hasInvoices = true;
  //     this.editingInvoice = false;
  //     this.viewingInvoice = false;
  //   }
  // }

  returnToMain() {
    this.hasInvoices = true;
    this.editingInvoice = false;
    this.viewingInvoice = false;
  }

  /* You will need to emit JSON with an entire model */
  editMode(event: any) {
    console.log("Inside App.component editMode");
    if (event == "edit")
      this.changeToEdit();
  }

  private changeToEdit() {
    this.hasInvoices = true;
    this.editingInvoice = true;
    this.viewingInvoice = false;
  }
}
