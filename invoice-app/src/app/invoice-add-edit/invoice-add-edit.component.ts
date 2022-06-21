import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../client.model';
import { Invoice } from '../invoice.model';
import { Item } from '../item.model';
import { Sender } from '../sender.model';
import { Guid } from 'guid-typescript';

import { InvoiceApiService } from '../invoice-api.service';


@Component({
  selector: 'app-invoice-add-edit',
  templateUrl: './invoice-add-edit.component.html',
  styleUrls: ['./invoice-add-edit.component.css']
})

export class InvoiceAddEditComponent implements OnInit {
  /*
   * Regex
   */
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight'];

  /*
   * Inputs 
   */
  @Input() editInvoice!: Invoice;
  @Input() editInvoiceItems!: Item[];

  listRef!: any;

  /*
   * Outputs
   */
  @Output() endEdit = new EventEmitter();
  @Output() saveDraft = new EventEmitter();
  @Output() addInvoice = new EventEmitter();
  @Output() closeForm = new EventEmitter();

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
  totalDue!: number;

  /*
   * Extra Data Structures
   */

  itemsToDelete: number[] = new Array();

  /*
   * Edit / Add Mode 
   * - If Adding Invoice is true then serve an empty object.
   */
  @Input() addingInvoiceMode !: boolean;

  constructor(private apiService: InvoiceApiService, private cdr: ChangeDetectorRef) { }

  /* Populate temporary invoice fields in order to submit them to the back end */
  ngOnInit(): void {
    if (this.addingInvoiceMode == true) {
      this.invoiceId = "";
      this.invoiceStatus = "";
      this.invoiceDateDue = new Date;
      this.invoiceAmountDue = 0;
      this.invoicePaymentTerms = "Net 1 Day";
      this.invoiceClient = new Client();
      this.invoiceSender = new Sender();
      this.editItems = new Array();
      this.editInvoiceItems = new Array();
      this.addItem();
    }

    /* User is editing an existing invoice */
    else {
      this.invoiceId = this.editInvoice.id;
      this.invoiceStatus = this.editInvoice.status;
      this.invoiceDateDue = this.editInvoice.dateDue;
      this.invoiceAmountDue = this.editInvoice.totalDue;
      this.invoicePaymentTerms = this.editInvoice.paymentTerms;
      this.invoiceClient = this.editInvoice.client;
      this.invoiceClient.item = new Array();
      this.invoiceSender = this.editInvoice.sender;
      this.totalDue = this.editInvoice.totalDue;
      this.editItems = new Array();
      this.editInvoiceItems.forEach(item => this.editItems.push(item));
    }
  }



  calculateTotal(item: Item): number {
    /* Fixes falsey values to return 0 instead of unhelpful NaN */
    return item.price * item.quantity || 0;
  }

  deleteItem(index: number): void {
    this.itemsToDelete.push(this.editItems[index].id);
    this.editItems.splice(index, 1);
  }

  addItem(): void {
    let addNewItem = new Item(); // Need to set item variables to prepare it for the back end
    addNewItem.setClientId(this.invoiceClient.id);
    this.editItems.push(addNewItem);
  }

  /*
   * HTTP Post 
   * Grabs unused ID's for Client and Sender models
   * from the back end before submitting.
   */
  saveAndSend(invoiceForm: any): void {
    invoiceForm.form.markAllAsTouched();
    if (!invoiceForm.form.valid)
      return;

    if (this.invoiceStatus.toLowerCase() == "draft")
      this.apiService.deleteDraft(this.invoiceId);

    this.calculatePrices();
    this.processItems();

    let tempInvoice = new Invoice();
    tempInvoice.setId(Guid.create().toString());
    tempInvoice.setStatus("Pending");
    tempInvoice.setPaymentTerms(this.invoicePaymentTerms);
    tempInvoice.setDateDue(this.invoiceDateDue);
    tempInvoice.setTotalDue(this.totalDue);
    tempInvoice.client = this.invoiceClient;
    tempInvoice.setSender(this.invoiceSender);

    /* Set items -> Maybe move this to another private function */
    this.editItems.forEach
      (editItem => {
        tempInvoice.client.item.push(editItem);
        this.apiService.addItem(editItem);
      });


    this.apiService.addInvoice(tempInvoice).subscribe();

    this.returnToMain();
  }

  /* 
   * HTTP Post Invoice
   * Posts a draft
   */
  saveToDraft(): void {
    this.calculatePrices();

    /* Need new object since we don't know which fields are filled out by the user */
    let tempInvoice = new Invoice();
    tempInvoice.setId(Guid.create().toString());
    tempInvoice.setStatus("Draft");
    tempInvoice.setPaymentTerms(this.invoicePaymentTerms);
    tempInvoice.setDateDue(this.invoiceDateDue);
    tempInvoice.setTotalDue(this.totalDue);
    tempInvoice.client = this.invoiceClient;
    tempInvoice.setSender(this.invoiceSender);

    this.editItems.forEach
      (editItem => {
        tempInvoice.client.item.push(editItem);
        this.apiService.addItem(editItem);
      });

    this.apiService.saveInvoiceAsDraft(tempInvoice);
    this.returnToMain();
  }

  /*
   * HTTP Put Invoice
   * Edit Existing Invoice
   */
  saveChanges(invoiceForm: any) {
    invoiceForm.form.markAllAsTouched();
    if (!invoiceForm.form.valid)
      return;

    this.calculatePrices();
    // this.processItems();

    let tempInvoice: Invoice = new Invoice(
      this.invoiceId,
      this.invoiceStatus,
      this.invoicePaymentTerms,
      this.invoiceDateDue,
      this.totalDue,
      this.invoiceClient,
      this.invoiceSender
    )

    /* Edit every affected table explicitly */
    this.editItems.forEach(
      item => {
        this.invoiceClient.item.push(item); // Item getter/setter sets off a null error
        this.apiService.updateItems(item.id, item)
      }
    );
    this.itemsToDelete.forEach(itemId => this.apiService.deleteItem(itemId));

    this.apiService.updateClient(this.invoiceClient.id, this.invoiceClient);
    this.apiService.updateSender(this.invoiceSender.id, this.invoiceSender);

    if (this.invoiceStatus.toLowerCase() !== "draft") {
      this.apiService.updateInvoice(this.invoiceId, new Invoice(
        this.invoiceId,
        this.invoiceStatus,
        this.invoicePaymentTerms,
        this.invoiceDateDue,
        this.totalDue,
        this.invoiceClient,
        this.invoiceSender
      ));
    }

    this.returnToMain();
  }

  /*
   * Private Class Methods
   */

  private calculatePrices() {
    /* Calculate total price*/
    let tempTotal = 0;
    this.editItems.forEach(item => {
      item.totalPrice = item.quantity * item.price;
      tempTotal += item.quantity * item.price || 0
    });
    this.totalDue = tempTotal;
  }

  /* 
   * Change it so it removes null items in case it somehow gets past the form validation 
   */
  private processItems() {
    /*
     * Process array and remove null items as a security measure - code shouldn't 
     * get here by normal use of the application.
     */
  }

  /*
   * Emitted Events
   */
  returnToMain(): void {
    this.editInvoice = new Invoice();
    this.closeForm.emit('close');
    this.endEdit.emit('main');
  }
}
