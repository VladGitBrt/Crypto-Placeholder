import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { ITableData } from 'src/app/modules/dashboard/model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  private apiUrl: string = 'https://min-api.cryptocompare.com/data';
  private imageApiUrl: string = 'https://www.cryptocompare.com';
  constructor(private http: HttpClient) { 
  }

  getCoinTableData(): Observable<ITableData[]> {
    return this.http.get<any>(`${this.apiUrl}/all/coinlist`).pipe(
      switchMap((data: any) => {
        const symbolData = this.getLimitedData(data.Data);
        const symbolArray = symbolData.map(coin => coin.Symbol);
        const symbolStringData = symbolArray.join(',');

        return this.http.get<any>(`${this.apiUrl}/pricemultifull?fsyms=${symbolStringData}&tsyms=USD`).pipe(
          switchMap(fullData => {
            return this.transformResponse(fullData.RAW);
          })
        );
      })
    );
  }

  private transformResponse(response: any): Observable<ITableData[]> {
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
        positionCounter++;
        transformedData.push(tableData);
      }
    }
    return of(transformedData);
  }

  getLimitedData(data: any): any[] {
    let limitedData: any[] = [];
    for(let value in data) {
      if(data.hasOwnProperty(value)){
        limitedData.push(data[value]);
        if(limitedData.length === 100) {
          break;
        }
      }
    }
    return limitedData;
  }
}
