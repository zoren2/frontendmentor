import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Client } from '../client.model';
import { Invoice } from '../invoice.model';
import { Item } from '../item.model';
import { Sender } from '../sender.model';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})

export class InvoiceEditComponent implements OnInit {
  /*
   * Regex
   */
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight'];

  /*
   * Inputs 
   */
  @Input() editInvoice!: Invoice;
  @Input() editItemsInvoice!: Item[];

  /*
   * Outputs
   */
  @Output() endEdit = new EventEmitter();


  /*
   * Form Fields
   */
  invoiceId!: string;
  invoiceStatus!: string;
  invoiceDateDue!: Date;
  invoiceAmountDue!: number;
  invoicePaymentTerms!: string;
  invoiceClient!: Client;
  invoiceSender!: Sender;
  editItems!: Item[];

  /*
   * Edit / Add Mode 
   * - Controlled explicitly by boolean values
   */


  constructor() { }

  ngOnInit(): void {
    console.log(this.editInvoice);
    this.invoiceId = this.editInvoice.id;
    this.invoiceStatus = this.editInvoice.status;
    this.invoiceDateDue = this.editInvoice.dateDue;
    this.invoiceAmountDue = this.editInvoice.totalDue;
    this.invoicePaymentTerms = this.editInvoice.paymentTerms;
    this.invoiceClient = this.editInvoice.client;
    this.invoiceSender = this.editInvoice.sender;

    this.editItems = new Array();
    this.editItemsInvoice.forEach(item => this.editItems.push(item))

    console.log(this.invoiceSender);
    console.log(this.editItems);
  }

  returnToMain(): void {
    this.endEdit.emit('back-to-main');
  }

  calculateTotal(item: Item): number {
    return item.price * item.quantity;
  }

  deleteItem(index: number): void {
    this.editItems.splice(index, 1);
  }

  addItem(): void {
    this.editItems.push(new Item());
  }
}
