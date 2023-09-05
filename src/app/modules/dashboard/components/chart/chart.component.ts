import { Component, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { ChartSetupService } from 'src/app/core/services/chart.setup.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  constructor( private chartSetupService: ChartSetupService){}

  ngOnInit(): void {
    this.chartSetupService.chartSetup(document.getElementById('chart-main')!)
  }
}
