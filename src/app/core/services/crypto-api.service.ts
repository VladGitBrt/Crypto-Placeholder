import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITableData } from 'src/app/modules/dashboard/components/coin-list/coin-list.component';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  private apiUrl: string = 'https://min-api.cryptocompare.com/data';
  private imageApiUrl: string = 'https://www.cryptocompare.com';

  constructor(private http: HttpClient) { }

  getCoinTableData(): any {
    this.http.get<any>(`${this.apiUrl}/all/coinlist`)
      .subscribe((data: any) => {
        let symbolData = [];
        let symbolStringData: string = '';
        symbolData = this.getLimitedData(data.Data);
        symbolData = symbolData.map(coin => {
          return {
            coinSymbol: coin.Symbol
          }
        })
        let symbolArray = symbolData.map(coin => coin.coinSymbol)
        symbolStringData = symbolArray.join(',')      
        this.http.get<any>(`${this.apiUrl}/pricemultifull?fsyms=${symbolStringData}&tsyms=USD`)
          .subscribe(fullData => {
            this.transformResponse(fullData.RAW)
          })
      })
    
  }

   private transformResponse(response: any): ITableData[]{
        console.log(response)
        const transformedData: ITableData[] = [];
        let positionCounter: number = 1;
        for (let symbol in response) {
          if (response.hasOwnProperty(symbol)) {
            const stock = response[symbol].USD;
            const tableData: ITableData = {
              number: positionCounter.toString(),
              coinName: stock.FROMSYMBOL,
              coinPrice: stock.PRICE,
              dailyPercent: stock.VOLUME24HOUR,
              dailyHigh: stock.HIGH24HOUR,
              dailyLow: stock.LOW24HOUR,
              imageUrl: stock.IMAGEURL
            };
            transformedData.push(tableData);
          }
        }
        console.log(transformedData);
        return transformedData;
  }

  getLimitedData(data: any): any[] {
    let limitedData: any[] = [];
    for(let value in data) {
      if(data.hasOwnProperty(value)){
        limitedData.push(data[value]);
        if(limitedData.length === 50) {
          break;
        }
      }
    }
    return limitedData;
  }
}
