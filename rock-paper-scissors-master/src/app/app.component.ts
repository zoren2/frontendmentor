import { Component, EventEmitter, ViewChild } from '@angular/core';
import { RpsGameComponent } from './rps-game/rps-game.component';
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentScore!:number;
  title = 'rock-paper-scissors-master';
  @ViewChild(RpsGameComponent) rpsGame!: RpsGameComponent;

  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.currentScore = this.rpsGame.getUserScore();
    this.cdref.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }
  // updateUserScore(score: number) {
  //   this.currentScore = score;
  // }

}
