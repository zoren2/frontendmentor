import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [
    trigger('hamburgerX', [
      /*
        state hamburger => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburger', style({})),
      /*
       * Top
       */
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      /*
       * Hide
       */
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      /*
       * Bottom
       */
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'), // controls animation speed
      ]),
    ]),
  ],
})

export class NavMenuComponent implements OnInit {

  isHamburger = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log("clicked");
    this.isHamburger = !this.isHamburger;
  }
}
