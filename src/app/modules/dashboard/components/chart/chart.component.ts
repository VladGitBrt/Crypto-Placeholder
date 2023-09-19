import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as echarts from 'echarts';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/core/interfaces/app.state.interface';
import { ChartSetupService } from 'src/app/core/services/chart.setup.service';
import { isSelectedDataLoaded } from '../../store/dashboard.selectors';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  isDataLoaded$: Observable<boolean>;
  constructor( private chartSetupService: ChartSetupService, private store$: Store<AppStateInterface>){
    this.isDataLoaded$ = this.store$.select(isSelectedDataLoaded);
  }

  ngOnInit(): void {
    this.chartSetupService.chartSetup(document.getElementById('chart-main')!)
  }
}

