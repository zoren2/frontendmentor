import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  @Input() planet !: any;
  @Input() infoMode !: any; // Overview / Structure / Surface;

  // Handles overview / structure 
  @Output() innerInfoMode = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  setInfoMode(mode: String) {
    this.infoMode = mode;
  }

  getButtonColor(button: HTMLDivElement) {
    if (this.infoMode === 'overview') {
      if (button.classList.contains('structure') ||
        button.classList.contains('surface'))
        return "clear-background " + this.planet.name.toLowerCase() + "-hover";
    }

    else if (this.infoMode === 'structure') {
      if (
        button.classList.contains('overview') ||
        button.classList.contains('surface'))
        return "clear-background " + this.planet.name.toLowerCase() + "-hover";
    }

    else if (this.infoMode === 'surface') {
      if (
        button.classList.contains('overview') ||
        button.classList.contains('structure'))
        return "clear-background " + this.planet.name.toLowerCase() + "-hover";
    }

    return this.planet.name.toLowerCase() + "-hover";
  }
}
