import { Component, Input, OnInit } from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { ApiService } from '../../service/ApiService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
  @Input() mainMotto: string;
  public postList: INavigation[];
  public isNavOpen = false;
  constructor(
    private readonly _apiService: ApiService,
  ) { }

  public ngOnInit(): void {
    this._apiService.get('/').subscribe(res => {
      console.log(res)
    });
  }

}
