import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  @Input() isVisible: boolean;

  public readonly logoUrl = environment.production ? '/primary-angular//assets/images/logo.png' : '/assets/images/logo.png'
  public readonly logoText = "Logo - Zespół Szkolno-Przedszkolny w Hażlachu"
  public readonly tabIndex = 2;

  constructor() { }

  public ngOnInit(): void {
  }

}
