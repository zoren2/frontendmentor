import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  @Input() planet !: any;
  @Input() infoMode !: any; // Overview / Structure / Surface;
  
  constructor() { }

  ngOnInit(): void {}

}
