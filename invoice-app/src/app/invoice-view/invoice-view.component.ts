import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {
  /* Emit to the main component when user wants to leave View Invoice State */
  @Output() endView = new EventEmitter();
  @Output() startEdit = new EventEmitter();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /* Emits a string to tell main component to return the main page */
  returnToMain(): void {
    this.endView.emit('back-to-main');
  }

  startEditInvoice(): void {
    console.log("Emitting from Edit Button");
    this.startEdit.emit('edit');
  }

  openDeleteDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}
