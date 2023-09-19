import { Injectable } from '@angular/core';
import * as echarts from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class ChartSetupService {

  constructor() { }

  chartSetup(chartContainer: HTMLElement){
    var chartDom = chartContainer;
    var myChart = echarts.init(chartDom);
    var option;
    
    option = {
      xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27','2017-10-27','2017-10-27','2017-10-27','2017-10-27','2017-10-27']
      },
      yAxis: {},
      series: [
        {
          type: 'candlestick',
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42],
            [38, 15, 5, 42],
            [40, 35, 30, 50],
            [38, 15, 5, 42],
            [20, 34, 10, 38],
            [40, 35, 30, 50],
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }
}
