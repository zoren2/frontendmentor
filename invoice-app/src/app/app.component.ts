import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { Client } from './client.model';
import { InvoiceApiService } from './invoice-api.service';
import { Invoice } from './invoice.model';
import { Item } from './item.model';
import { Sender } from './sender.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  title = 'invoice-app';

  /* Mode Variables */
  hasInvoices: boolean = true;
  editingInvoice: boolean = false;
  viewingInvoice: boolean = false;
  addingInvoice: boolean = false;

  /* Pipe filters for invoices */
  showDraftsChecked = true;
  showPendingChecked = true;
  showPaidChecked = true;

  /* Temporary variables to that gets sent between components */
  currentClient!: number;;

  /* Counters to keep track of temporary draft items */
  draftCounter: number = 0;
  itemCounter: number = 0;

  /* Temporary variable to hold an instance of User selected invoice */
  currentInvoice !: Invoice;
  currentItems !: Item[];
  draftInvoice !: Invoice;

  /* Lists */
  invoices$!: Observable<any[]>;
  clients$!: Observable<any[]>;
  items$!: Observable<any[]>

  invoices: Invoice[] = new Array();
  items: Item[] = new Array();
  clients: Client[] = new Array();

  constructor(private service: InvoiceApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.getInvoiceList(); // Gather All Backend Endpoints
    this.service.getClient();
    this.service.getItems();

    this.invoices$ = this.service.invoices$; // Grab the readOnly values
    this.clients$ = this.service.clients$;
    this.items$ = this.service.items$;

    this.invoices$.subscribe(res => res.map(
      (invoice: Invoice) => {
        this.invoices.push(invoice)
      }));

    this.items$.subscribe(res => res.map(
      (item: Item) => {
        this.items.push(item)
      }));

    this.clients$.subscribe(res => res.map(
      (client: Client) => {
        this.clients.push(client)
      }));
  }

  toggleHasInvoice(): void {
    this.hasInvoices = !this.hasInvoices;
  }

  toggleEdit(): void {
    this.editingInvoice = !this.editingInvoice;
  }

  toggleAdd(): void {
    this.editingInvoice = !this.editingInvoice;
    this.addingInvoice = !this.addingInvoice;
  }

  /* Emitted from Invoice Component */
  toggleViewingInvoice(event: any): void {
    this.currentClient = event;
    this.viewingInvoice = !this.viewingInvoice;

    /*
     * ITEMS:
     * Processing items from service
     */

    this.currentItems = new Array();

    this.items.forEach(
      (item: Item) => {
        if (event == item.clientId) {
          this.currentItems.push(item);
        }
      });
    this.currentInvoice = this.invoices[this.invoices.findIndex((invoice: Invoice) => invoice.client.id === this.currentClient)]; // Finds invoice with client name
  }

  public trackInvoiceFn(index: number, invoice: Invoice) {
    return invoice.id;
  }

  /* Reset all mode boolean values */
  returnToMain() {
    this.hasInvoices = true;
    this.editingInvoice = false;
    this.viewingInvoice = false;
    this.addingInvoice = false;

    this.updateInvoices();
  }

  /* 
   * Get the updated items 
   */
  updateInvoices() {
    // Update all of the arrays used for binding
    this.invoices = new Array();
    this.items = new Array();
    this.clients = new Array();

    this.invoices$.subscribe(res => res.map(
      (invoice: Invoice) => {
        this.invoices.push(invoice)
      }));

    this.items$.subscribe(res => res.map(
      (item: Item) => {

        this.items.push(item);
      }));

    this.clients$.subscribe(res => res.map(
      (client: Client) => {
        this.clients.push(client)
      }));
  }

  /*
   * Events from View.component
   * Perhaps merge it with the other one and create a switch case
   */

  deleteInvoice(event: any) {
    this.returnToMain();
  }

  /* 
   * Events from Add/Edit.component 
   */
  changeMode(event: any) {
    if (event == "edit")
      this.changeToEdit();
    if (event == "main")
      this.returnToMain();
  }

  /* 0. Process total cost
   * 1. Save Emitted Draft Invoice
   * 2. Save Emitted Items
   * Currently emits item of type {invoice: Invoice, items: Items[]}
   * Uses counters as tempoary variables to avoid collisions with API retrieved items
   * (Needs validation)
   */
  saveDraft(event: any) {
    this.returnToMain();
  }

  addInvoiceToMain(event: any) {
    this.returnToMain();
  }

  /*
   * Private Helper Class Functions
   */
  private changeToEdit() {
    this.hasInvoices = true;
    this.editingInvoice = true;
    this.viewingInvoice = false;
  }
}
