import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  @Output() endEdit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  /* Emits a string to tell main component to return the main page */
  returnToMain(): void {
    this.endEdit.emit('back-to-main');
  }
}
