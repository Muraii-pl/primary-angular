import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  @Input() isVisible: boolean;

  public readonly logoUrl = `${environment.imagesUrl}assets/images/logo.png`
  public readonly logoText = "Logo - Zespół Szkolno-Przedszkolny w Hażlachu"
  public readonly linkToHome = environment.homeUrl

  constructor(

    private readonly _cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
  }

}
