import { Component, OnInit } from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { ApiService } from '../../service/ApiService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  public postList: INavigation[];
  constructor(
    private readonly _apiService: ApiService,
  ) { }

  public ngOnInit(): void {
    this._apiService.get('/').subscribe(res => {
      console.log(res)
    });
  }

}
