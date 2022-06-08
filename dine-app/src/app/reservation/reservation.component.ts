import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  submitted: boolean = false;
  reservation!: Reservation;
  counter: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.reservation = new Reservation();
  }

  onAdd() {
    this.counter++;
  }

  onSubtract() {
    if (this.counter > 1)
      this.counter--;
  }
  onSubmit() {

  }

  getPeople(): string {
    if (this.counter == 1)
      return `${this.counter} Person`;
    else if (this.counter < 0) {
      this.counter == 0;
      return `${this.counter} People`
    }
    else
      return `${this.counter} People`;
  }
}
