import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-tile',
  templateUrl: './navigation-tile.component.html',
  styleUrls: ['./navigation-tile.component.css']
})
export class NavigationTileComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  public ngOnInit(): void {
  }

}
