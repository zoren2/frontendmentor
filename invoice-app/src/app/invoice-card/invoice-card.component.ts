import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invoice } from '../invoice.model';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss']
})
export class InvoiceCardComponent implements OnInit {

  /*
   * Checkbox filters 
   */
  @Input() showDraftsChecked!: boolean;
  @Input() showPaidChecked!: boolean;
  @Input() showPendingChecked!: boolean;

  /*
   * Input / Outputs
   */
  @Input() invoice: Invoice = new Invoice();
  @Output() showInvoice: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {}

  /* Emits client ID to determine which invoice to grab - because it needs it to grab the items too */
  viewInvoice(): void {
    /* Sends client back to main component number */
    this.showInvoice.emit(this.invoice.client.id);
  }

  /* Repeated Code... */
  getStatus(): string {
    if (this.invoice.status.toLowerCase() == "paid")
      return "invoice-status-paid";
    if (this.invoice.status.toLowerCase() == "pending")
      return "invoice-status-pending";
    if (this.invoice.status.toLowerCase() == "draft")
      return "invoice-status-draft";
    return '';
  }

  getStatusDot(): string {
    // 
    if (this.invoice.status.toLowerCase() == "paid")
      return "invoice-status-indicator-paid"
    if (this.invoice.status.toLowerCase() == "pending")
      return "invoice-status-indicator-pending"
    if (this.invoice.status.toLowerCase() == "draft")
      return "invoice-status-indicator-draft";
    return ''
  }
}
