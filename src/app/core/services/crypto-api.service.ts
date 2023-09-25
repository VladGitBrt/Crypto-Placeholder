import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { IChartData, ICoinData, ICoinListResponse, ITableData } from 'src/app/modules/dashboard/model/dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private apiUrl: string = 'https://min-api.cryptocompare.com/data';
  private searchItemLimit: number = 200;
  constructor(private http: HttpClient) { 
  }

  getChartData(coinName: string): Observable<IChartData[]> {
    return this.http.get<any>(`${this.apiUrl}/v2/histoday?fsym=${coinName}&tsym=USD&limit=250`).pipe(
      map((response)=> {
        if(response.Response === 'Success'){
          return response.Data.Data.map((item: any)=> {
            return {
              high: item.high,
              low: item.low,
              open: item.open,
              close: item.close,
              time: item.time
            }
          })
        } else {
          return null
        }
      })
    )
  }

  getCoinNameList(): Observable<ICoinListResponse> {
   return this.http.get<ICoinListResponse>(`${this.apiUrl}/blockchain/list`)
  }

  getCoinDataByName(coinName: string): Observable<ICoinData> {
    return this.http.get<any>(`${this.apiUrl}/pricemultifull?fsyms=${coinName}&tsyms=USD`)
    .pipe(
      map(response => this.selectedTransformResponse(response.RAW))
    );
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

  private selectedTransformResponse(response: any): ICoinData {
    let coinData: ICoinData = {
      coinName: '',
      coinPrice: '',
      dailyPercent: '',
      marketCap: '',
      circulatingSupply: '',
      fullyDiluted: '',
      volume24hr: '',
      marketCapPrice: '',
      circulatingSupplyPrice: '',
      fullyDilutedPrice: '',
      volume24hrPrice: '',
      imageUrl: ''
    };
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        const data = response[key]['USD'];
        const coin: ICoinData = {
          coinName: data.FROMSYMBOL,
          coinPrice: data.PRICE.toString(),
          dailyPercent: data.CHANGE24HOUR.toString(),
          marketCap: data.MKTCAP.toString(),
          circulatingSupply: data.CIRCULATINGSUPPLY.toString(),
          fullyDiluted: data.LASTVOLUME.toString(),
          volume24hr: data.VOLUME24HOUR.toString(),
          marketCapPrice: data.LASTVOLUME.toString(),
          circulatingSupplyPrice: data.CIRCULATINGSUPPLYMKTCAP.toString(),
          fullyDilutedPrice: data.SUPPLY.toString(),
          volume24hrPrice: data.TOTALVOLUME24HTO.toString(),
          imageUrl: data.IMAGEURL
        };
        coinData = coin;
      }
    }
    return coinData;
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
    return ((Math.round(value * multiplier) / multiplier)).toString();
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
