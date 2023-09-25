import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ChartSetupService } from 'src/app/core/services/chart.setup.service';
import { DashboardFacade } from '../../store/dashboard-facade.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy{
  isChartLoaded$: Observable<boolean>;
  isChartDataExists: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor( private chartSetupService: ChartSetupService, private dashboardFacade: DashboardFacade){
    this.isChartLoaded$ = this.dashboardFacade.getIsChartLoaded();
    this.chartSetupService.isChartDataExists$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isDataExists => {
        this.isChartDataExists = isDataExists
      })
  }

  ngOnInit(): void {
    this.chartSetupService.chartSetup(document.getElementById('chart-main')!)
  }
  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

