import { Component, OnInit } from '@angular/core';

type CurrentTab = 'list' | 'calc' | 'chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public username: string = 'Loading...'
  constructor(){}

  ngOnInit(): void {
      if(localStorage.getItem('username')){
        this.username = localStorage.getItem('username')!
      }
  }
}
