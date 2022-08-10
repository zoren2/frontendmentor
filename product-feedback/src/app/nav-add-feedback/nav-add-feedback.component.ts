import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-add-feedback',
  templateUrl: './nav-add-feedback.component.html',
  styleUrls: ['./nav-add-feedback.component.scss']
})
export class NavAddFeedbackComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickNewFeedback(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl('/addFeedback');
  }

}
