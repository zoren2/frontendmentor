import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  @Output() endEdit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  returnToMain(): void {
    this.endEdit.emit('back-to-main');
  }
}
