import { Component, ElementRef, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'planet-facts-app';
  planets$!: Observable<any[]>;
  planets = new Array();

  infoMode: String; // Overview / Structure / Surface;
  currentPlanet: any;

  constructor(private planetService: PlanetService, private dialog: MatDialog) {
    this.infoMode = "overview";
    this.currentPlanet = 'mercury';
  }

  ngOnInit() {
    this.planets$ = this.planetService.getPlanets();
    this.planets$.subscribe(res => res.map(
      (planet: any) => {
        this.planets.push(planet);
      }));
    this.currentPlanet = this.planets[0];
  }

  getPlanet() {
    return this.planets.indexOf(this.currentPlanet);
  }

  setPlanet(planetName: any, checkbox?: HTMLInputElement) {
    if (checkbox) {
      checkbox.checked = false;
    }
    this.currentPlanet = this.planets.filter(planet => {
      return planet.name.toLowerCase() === planetName.toLowerCase();
    })[0];
    this.infoMode = 'overview';
  }

  setMode(mode: string) {
    this.infoMode = mode;
  }

  hideMenu() {

  }


  // Tied with @menu-nav-bottom mixin
  getMenuBottom(button: HTMLDivElement) {
    if (this.infoMode === 'overview') {
      if (button.classList.contains('structure') ||
        button.classList.contains('surface'))
        return "clear-border " + "color-" + this.currentPlanet.name.toLowerCase();
    }

    else if (this.infoMode === 'structure') {
      if (
        button.classList.contains('overview') ||
        button.classList.contains('surface'))
        return "clear-border " + "color-" + this.currentPlanet.name.toLowerCase();
    }

    else if (this.infoMode === 'surface') {
      if (
        button.classList.contains('overview') ||
        button.classList.contains('structure'))
        return "clear-border " + "color-" + this.currentPlanet.name.toLowerCase();
    }

    return "color-" + this.currentPlanet.name.toLowerCase();
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: "100vw",
      height: "90vh"
    });
  }
}


