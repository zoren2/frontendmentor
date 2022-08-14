import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roadmap-card',
  templateUrl: './roadmap-card.component.html',
  styleUrls: ['./roadmap-card.component.scss']
})
export class RoadmapCardComponent implements OnInit {

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
