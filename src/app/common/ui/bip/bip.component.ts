import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bip',
  templateUrl: './bip.component.html',
  styleUrls: ['./bip.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
