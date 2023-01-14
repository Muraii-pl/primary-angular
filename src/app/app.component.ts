import { Component, OnInit } from '@angular/core';
import { ApiService } from './common/service/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'primary-school-angular';

  constructor(
    private readonly _apiService: ApiService
  ) {
  }

 public ngOnInit():void {
    this._apiService.get('/posts').subscribe(res => {
      console.log(res)
    })
 }
}
