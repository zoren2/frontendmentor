import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  submitted: boolean;
  reservation!: Reservation;
  counter: number = 1;

  constructor() {
    this.reservation = new Reservation();
    this.submitted = false;
  }

  ngOnInit(): void {

  }

  onAdd() {
    this.counter++;
  }

  onSubtract() {
    if (this.counter > 1)
      this.counter--;
  }
  onSubmit(reservationForm: any) {
    reservationForm.form.markAllAsTouched();
    if (!reservationForm.form.valid)
      return;
    console.log(reservationForm.form.value);
    this.submitted = true;
  }

  toggleSubmitted() {
    this.submitted = !this.submitted;
    console.log('hi');
    alert('hi');
  }
  touchAll(reservationForm: any) {
    reservationForm.form.markAllAsTouched();
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
