import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../client.model';
import { InvoiceApiService } from '../invoice-api.service';
import { Invoice } from '../invoice.model';
import { Item } from '../item.model';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {
  /* Emit to the main component when user wants to leave View Invoice State */
  @Output() endView = new EventEmitter();
  @Output() startEdit = new EventEmitter();
  @Output() deleteInvoiceEmit = new EventEmitter();

  @Input() viewInvoice: Invoice = new Invoice();
  @Input() itemsForInvoice: Item[] = new Array();

  constructor(private apiService: InvoiceApiService, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  /* 
   * Delete / Update / Check Invoice
   */

  /* 
   * Remember to add getter/setters 
   * 1. Delete Items
   * 2. Delete Attached Client
   * 3. Delete Attached Sender
   * 4. Delete Invoice
   */

  deleteInvoice(): void {
    this.itemsForInvoice.forEach(item => this.apiService.deleteItem(item.id));
    this.apiService.deleteClient(this.viewInvoice.client.id);
    this.apiService.deleteInvoice(this.viewInvoice.id);
    this.returnToMain();
  }

  markInvoiceAsPaid(): void {
    this.apiService.updateInvoice(this.viewInvoice.id, new Invoice(
      this.viewInvoice.id,
      "Paid",
      this.viewInvoice.paymentTerms,
      this.viewInvoice.dateDue,
      this.viewInvoice.totalDue,
      this.viewInvoice.client,
      this.viewInvoice.sender
    ));

    this.returnToMain();
  }

  /* Emits a string to tell main component to return the main page */
  returnToMain(): void {
    this.endView.emit('main');
  }

  startEditInvoice(): void {
    this.startEdit.emit('edit');
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  openFormDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: '50vw',
      height: '75vh'
    });
  }


  /*
   * Directive controlled CSS Functions
   */
  getStatus(): string {
    if (this.viewInvoice.status.toLowerCase() == "paid")
      return "invoice-status-paid";
    if (this.viewInvoice.status.toLowerCase() == "pending")
      return "invoice-status-pending";
    if (this.viewInvoice.status.toLowerCase() == "draft")
      return "invoice-status-draft";
    return '';
  }

  getStatusDot(): string {
    if (this.viewInvoice.status.toLowerCase() == "paid")
      return "invoice-status-indicator-paid"
    if (this.viewInvoice.status.toLowerCase() == "pending")
      return "invoice-status-indicator-pending"
    if (this.viewInvoice.status.toLowerCase() == "draft")
      return "invoice-status-indicator-draft";
    return ''
  }
}
