import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../../store/dashboard-facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public username: string = 'Loading...';
  isLoading$: Observable<boolean>;
  constructor(private dashboardFacade: DashboardFacade){
    this.isLoading$ = this.dashboardFacade.getLoading();
  }

  ngOnInit(): void {
      if(localStorage.getItem('username')){
        this.username = localStorage.getItem('username')!
      }
      this.dashboardFacade.getTableData()
  }

  selectCoin(coinName: string){
    this.dashboardFacade.getChartData(coinName);
    this.dashboardFacade.patchCoinData(coinName);
  }
}
