import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rps-game',
  templateUrl: './rps-game.component.html',
  styleUrls: ['./rps-game.component.css']
})
export class RpsGameComponent {
  // Reference to Buttons
  @ViewChild('gameContainer') game!: ElementRef;
  @ViewChild('rockButton') rock!: ElementRef;
  @ViewChild('paperButton') paper!: ElementRef;
  @ViewChild('scissorButton') scissor!: ElementRef;
  @ViewChild('reset') reset!: ElementRef;
  @ViewChild('result') resultEl!: ElementRef;

  // Output to outer component
  @Output() updateScore = new EventEmitter<number>();

  // Game options that the house randomly selects from 
  private selection = [
    'btn-rock',
    'btn-paper',
    'btn-scissor'
  ];

  // Defaults for buttons
  ruleModalOpened: boolean = false;
  userSelectedRPS: boolean = false;

  // Game fields
  private userScore: number = 0;
  private houseSelection: string = 'btn-scissor';
  private userSelection!: string;

  // Result (Win, Lose, Draw)
  private result!: string;

  public onRPSButtonSelected(button: HTMLButtonElement) {
    let userPick = button.className;

    /*
     *  If individual game finished, do not toggle anything else
     */
    if (this.userSelectedRPS === true)
      return;

    this.game.nativeElement.classList.toggle('rps-game-container-bg');
    this.rock.nativeElement.classList.toggle('btn-rock');

    /*
     * Main game Loop
     */
    this.houseSelection = this.selection[Math.floor(Math.random() * 3)];

    /*
     * Display user choice
     */

    this.paper.nativeElement.className = userPick;
    this.setUserPick(userPick);
    this.scissor.nativeElement.classList.toggle('btn-scissor');
    this.toggleGameResult();


    setTimeout(() => {
      console.log("You selected: " + this.userSelection + " Computer selected: " + this.houseSelection);
      this.setGameScore();
      this.reset.nativeElement.className = 'btn-reset';
      this.resultEl.nativeElement.hidden = false;
    }
      , 2 * 1500);


  }

  /*
   * Indicates to the container that the game state moves from (No Selection Made) -> (User Made a Selection)
   */
  private toggleGameResult() {
    this.userSelectedRPS = this.userSelectedRPS ? false : true;
  }

  private setGameScore() {
    this.scissor.nativeElement.classList.toggle(this.houseSelection);

    /*
     * Determine winner, since multiple classes are triggered for animations, explicit checks for
     * classes need to be checked
     */
    if (this.userSelection.includes('btn-paper') && this.houseSelection.includes('btn-paper') ||
      this.userSelection.includes('btn-scissor') && this.houseSelection.includes('btn-scissor') ||
      this.userSelection.includes('btn-rock') && this.houseSelection.includes('btn-rock'))
      this.setResult('YOU TIED'); // Don't set animation in case of a tie
    else if (this.userSelection.includes('btn-paper') && this.houseSelection.includes('btn-rock') ||
      this.userSelection.includes('btn-rock') && this.houseSelection.includes('btn-scissor') ||
      this.userSelection.includes('btn-scissor') && this.houseSelection.includes('btn-paper')) {
      this.userScore++;
      this.setResult('YOU WIN');
      this.paper.nativeElement.classList.toggle('animate');
    } else {
      this.userScore--;
      this.setResult('YOU LOSE');
      this.scissor.nativeElement.classList.toggle('animate');
    }

    this.updateScore.emit(this.userScore);

  }

  public getHousePick() {
    return this.houseSelection;
  }

  private setHousePick(houseSelection: string) {
    this.houseSelection = houseSelection;
  }

  public getUserPick() {
    return this.userSelection;
  }

  private setUserPick(selection: string) {
    this.userSelection = selection;
  }

  // Returns background class to the component
  public toggleBackgroundImage(background: HTMLDivElement): string {
    if (this.userSelectedRPS === false)
      return 'rps-game-container-bg';
    return '';
  }

  public getResult() {
    return this.result;
  }

  private setResult(result: string) {
    this.result = result;
  }

  public getUserScore() {
    return this.userScore;
  }

  public sendScore() {
    this.updateScore.emit(this.userScore);
  }
  public onRuleButtonClicked() {
    this.ruleModalOpened = this.ruleModalOpened ? false : true;
  }

  public onCloseModalClicked() {
    this.ruleModalOpened = this.ruleModalOpened ? false : true;
  }

  public toggleBackground(background: HTMLDivElement) {
    background.classList.toggle('rps-game-container-bg');
    return 'rps-game-container';
  }

  public resetGame(rock: HTMLButtonElement, paper: HTMLButtonElement, scissor: HTMLButtonElement) {
    /* 
     * Reset button classes to entry point state 
     */
    this.game.nativeElement.className = 'rps-game-container rps-game-container-bg'
    this.paper.nativeElement.className = 'btn-paper';
    this.scissor.nativeElement.className = 'btn-scissor rps-game-house-bg';
    this.reset.nativeElement.className = 'hide-element';

    /*
     * Hide result
     */
    this.resultEl.nativeElement.hidden = true;
    this.result = '';

    /*
     * Set game back to no-selection-made state
     */
    this.toggleGameResult();
  }
}

