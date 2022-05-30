
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, delay, forkJoin, map, mergeMap } from 'rxjs';
import { Client } from './client.model';
import { Invoice } from './invoice.model';
import { Item } from './item.model';
import { Sender } from './sender.model';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

/*
 * Todo: Build individual models for service endpoints 
 */
export class InvoiceApiService {
  readonly invoiceAPIUrl: string = "https://localhost:7132/api"

  /*
   * Behavior Subject acts as a source that actively keeps the state of the models on the back end
   * I haven't found another pattern that doesn't break the application between components due to some
   * race condition.
   */
  _invoices = new BehaviorSubject<Invoice[]>([]);
  _clients = new BehaviorSubject<Client[]>([]);
  _items = new BehaviorSubject<Item[]>([]);
  _senders = new BehaviorSubject<Sender[]>([]);

  readonly invoices$ = this._invoices.asObservable();
  readonly clients$ = this._clients.asObservable();
  readonly items$ = this._items.asObservable();
  readonly senders$ = this._items.asObservable();

  invoices: Invoice[] = []; // Temporary storage to create the BehaviorSubject
  clients: Client[] = [];
  items: Item[] = [];
  senders: Sender[] = [];

  constructor(private http: HttpClient) { }

  /*
  * Invoice
  */

  /*
   * Returns an invoice populated with a Client and Sender using forkjoin
   */
  getInvoiceList() {
    this.invoices = new Array();
    forkJoin(
      [this.http.get<any>(this.invoiceAPIUrl + '/invoices'),
      this.http.get<any>(this.invoiceAPIUrl + '/clients'),
      this.http.get<any>(this.invoiceAPIUrl + '/senders')]
    ).pipe(
      map(([invoices, clientMap, senderMap]) => Object.keys(invoices)
        .map(invoiceKey => {
          const invoice = invoices[invoiceKey];
          const client = clientMap[invoiceKey];
          const sender = senderMap[invoiceKey];
          return {
            ...invoice,
            client,
            sender
          };
        })
      )).subscribe(res => {
        res.forEach(invoice => {
          // Process Invoice
          this.invoices.push(invoice);
        });
        this._invoices.next(Object.assign([], this.invoices));
      });
  }

  addInvoice(invoice: any) {
    this.invoices.push(invoice);
    invoice.client.item.forEach((item: any) => delete item.id);
    this._invoices.next(Object.assign([], this.invoices)); // Update Behavior Subject
    return this.http.post<any>(this.invoiceAPIUrl + '/invoices', invoice);
  }

  updateInvoice(id: number | string, data: Invoice) {
    this.invoices.splice(this.invoices.findIndex(invoice => invoice.id === id), 1, data);
    this._invoices.next(Object.assign([], this.invoices));
    this.http.put(this.invoiceAPIUrl + `/invoices/${id}`, data).subscribe();
  }

  deleteInvoice(id: number | string) {
    this.invoices.splice(this.invoices.findIndex(invoices => invoices.id === id), 1);
    this._invoices.next(Object.assign([], this.invoices));
    return this.http.delete(this.invoiceAPIUrl + `/invoices/${id}`).subscribe();
  }

  /*
   * Client
   */
  getClient() {
    // 
    return this.http.get<any>(this.invoiceAPIUrl + '/clients').subscribe(
      res => {
        res.forEach((client: Client) => this.clients.push(client));
        this._clients.next(Object.assign([], this.clients));
      });
  }

  updateClient(id: number, data: Client) {
    this.clients.splice(this.clients.findIndex(client => client.id === id), 1, data);
    this._clients.next(Object.assign([], this.clients));
    return this.http.put(this.invoiceAPIUrl + `/clients/${id}`, data).subscribe();
  }

  deleteClient(id: number) {
    this.clients.splice(this.clients.findIndex(client => client.id === id), 1);
    this._clients.next(Object.assign([], this.clients));
    return this.http.delete(this.invoiceAPIUrl + `/clients/${id}`).subscribe();
  }

  /*
   * Sender
   */
  getSender() {
    return this.http.get<any>(this.invoiceAPIUrl + '/senders').subscribe(
      res => {
        res.forEach((sender: Sender) => this.senders.push(sender));
        this._senders.next(Object.assign([], this.senders));
      });
  }

  updateSender(id: number, data: Sender) {
    this.senders.splice(this.senders.findIndex(sender => sender.id === id), 1, data);
    this._senders.next(Object.assign([], this.senders));
    return this.http.put(this.invoiceAPIUrl + `/senders/${id}`, data).subscribe();
  }

  deleteSender(id: number) {
    this.senders.splice(this.senders.findIndex(sender => sender.id === id), 1);
    this._senders.next(Object.assign([], this.senders));
    return this.http.delete(this.invoiceAPIUrl + `/senders/${id}`).subscribe();
  }

  /*
   * Items
   */
  getItems() {
    this.http.get<any>(this.invoiceAPIUrl + '/items').subscribe(
      res => {
        res.forEach((item: Item) => this.items.push(item));
        this._items.next(Object.assign([], this.items));
      });
  }

  updateItems(id: number, data: Item) {
    if (id === 0) {
      this.addItem(data);
    }
    this.items.splice(this.items.findIndex(item => item.id === id), 1, data);
    this._items.next(Object.assign([], this.items));
    this.http.put(this.invoiceAPIUrl + `/items/${id}`, data).subscribe();
  }

  addItem(item: Item) {
    this.items.push(item);
    this._items.next(Object.assign([], this.items)); // Update Behavior Subject
    return this.http.post<any>(this.invoiceAPIUrl + '/items', item);
  }

  deleteItem(id: number) {
    this.items.splice(this.items.findIndex(item => item.id === id), 1);
    this._items.next(Object.assign([], this.items));
    this.http.delete(this.invoiceAPIUrl + `/items/${id}`).subscribe();
  }
}
