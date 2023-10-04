import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as echarts from 'echarts';
import { AppStateInterface } from '../interfaces/app.state.interface';
import { chartData } from 'src/app/modules/dashboard/store/dashboard.selectors';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartSetupService {
  public isChartDataExists$ = new BehaviorSubject<boolean>(false);
  constructor(private store$: Store<AppStateInterface>) { }

  chartSetup(chartContainer: HTMLElement){
    let chartDom = chartContainer;
    let myChart = echarts.init(chartDom);
    this.store$.select(chartData)
    .subscribe((data) => {
      if(data !== null) {
        this.isChartDataExists$.next(true);
        let option = {
          xAxis: {
            data: [] as string[],
            scale: true,
          },
          yAxis: {},
          dataZoom: [
            {
              type: 'inside',
              start: 98,
              end: 100,
              minValueSpan: 10
            },
            {
              show: true,
              type: 'slider',
              bottom: 60,
              start: 98,
              end: 100,
              minValueSpan: 10
            }
          ],
          series: [
            {
              type: 'candlestick',
              data: [] as [number, number, number, number][]
            }
          ]
        };
        data.forEach(chart => {
          let chartUnit: [number, number, number, number] = [chart.close,chart.open,chart.low,chart.high];
          option.series[0].data.push(chartUnit);
          option.xAxis.data.push(this.chartTimeSetup(chart.time))
        })
        option && myChart.setOption(option);
      } else {
        this.isChartDataExists$.next(false);
        let option = {
          xAxis: {
            data: [] as string[]
          },
          yAxis: {},
          series: [
            {
              type: 'candlestick',
              data: [] as [number, number, number, number][]
            }
          ]
        };
      }
    })    
    
  }

  chartTimeSetup(timeInSeconds: number): string{
    const timestamp = timeInSeconds * 1000;

    // Create a new Date object using the timestamp
    const date = new Date(timestamp);

    // Get the year, month, and day from the Date object
    const year = date.getFullYear();
    // JavaScript months are 0-based, so add 1 to the month
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Form the date string in the 'YYYY-MM-DD' format
      return  `${year}-${month}-${day}`;
    }
}
