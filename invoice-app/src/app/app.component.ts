import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoice-app';
  hasInvoices: boolean = true;
  editingInvoice: boolean = false;

  toggleHasInvoice(): void {
    this.hasInvoices = !this.hasInvoices;
  }

  toggleEdit(): void {
    this.editingInvoice = !this.editingInvoice;
  }

  backToMain(event: string) {
    if(event == 'back-to-main') {
      this.hasInvoices = true;
      this.editingInvoice = false;
    }
  }
}
