import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { ITableData } from 'src/app/modules/dashboard/model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  private apiUrl: string = 'https://min-api.cryptocompare.com/data';
  private searchItemLimit: number = 200;
  constructor(private http: HttpClient) { 
  }

  getCoinDataByName(coinName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pricemultifull?fsyms=${coinName}&tsyms=USD`)
  }

  getCoinTableData(): Observable<ITableData[]> {
    return this.http.get<any>(`${this.apiUrl}/all/coinlist`).pipe(
      switchMap((data: any) => {
        const symbolData = this.getLimitedData(data.Data);
        const symbolArray = symbolData.map(coin => coin.Symbol);
        const symbolStringData = symbolArray.join(',');

        return this.http.get<any>(`${this.apiUrl}/pricemultifull?fsyms=${symbolStringData}&tsyms=USD`).pipe(
          switchMap(fullData => {
            return this.tableTransformResponse(fullData.RAW);
          })
        );
      })
    );
  }

  private tableTransformResponse(response: any): Observable<ITableData[]> {
    const transformedData: ITableData[] = [];
    let positionCounter: number = 1;
    for (let symbol in response) {
      if (response.hasOwnProperty(symbol)) {
        const stock = response[symbol].USD;
        const tableData: ITableData = {
          number: positionCounter.toString(),
          coinName: stock.FROMSYMBOL,
          coinPrice: `${this.round(stock.PRICE,2)}`,
          dailyPercent: `${this.round(stock.CHANGEPCT24HOUR,2)}`,
          dailyHigh: `${this.round(stock.HIGH24HOUR,2)}`,
          dailyLow: `${this.round(stock.LOW24HOUR,2)}` ,
          imageUrl: stock.IMAGEURL
        };
        positionCounter++;
        transformedData.push(tableData);
      }
    }
    return of(transformedData);
  }

  private round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return ((Math.round(value * multiplier) / multiplier)+5).toString();
  }

  private getLimitedData(data: any): any[] {
    let limitedData: any[] = [];
    for(let value in data) {
      if(data.hasOwnProperty(value)){
        limitedData.push(data[value]);
        if(limitedData.length === this.searchItemLimit) {
          break;
        }
      }
    }
    return limitedData;
  }
}
