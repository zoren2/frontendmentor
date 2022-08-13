import { animate, state, style, transition, trigger } from '@angular/animations';;
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

  /* Screen Resolutions */
  public screenWidth!: number;
  public screenHeight!: number;
  isHamburger = true;

  dialogRef!: MatDialogRef<any>;


  constructor(private dialog: MatDialog, private router: Router) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
  }

  onClick(templateRef: TemplateRef<any>) {
    console.log("clicked");
    this.isHamburger = !this.isHamburger;
    this.openFormDialog(templateRef);
  }

  onRoadmapClicked(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl('/roadmap');
  }

  private openFormDialog(templateRef: TemplateRef<any>) {
    const modalHeight = (this.screenHeight - 72) + 'px';
    this.dialogRef = this.dialog.open(templateRef, {
      height: modalHeight,
      width: '72.27vw',
      position: {
        right: '0',
        top: '72px'
      }
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.isHamburger = !this.isHamburger
    });
  }


}
