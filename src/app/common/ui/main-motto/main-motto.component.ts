import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-motto',
  templateUrl: './main-motto.component.html',
  styleUrls: ['./main-motto.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMottoComponent implements OnInit {

  public readonly mainMotto = "\"Uczymy się nie dla szkoły lecz dla życia\""
  constructor() { }

  public ngOnInit(): void {
  }

}
