import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss']
})
export class FeedbackCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewFeedback() {
    this.router.navigateByUrl('/feedback');
  }

  onClick(event: Event) {
    event.stopPropagation();
    console.log("card button clicked");
  }
}
