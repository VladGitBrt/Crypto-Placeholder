import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/core/interfaces/app.state.interface';
import { coinDataSelector, coinImageSelector, coinPriceSelector, cryptoDataSelector, isChartLoaded, isLoadingSelector, isSelectedDataLoaded } from './dashboard.selectors';
import * as DashboardActions from '../store/dashboard.actions'
import { ICoinData, ITableData } from '../model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {

  constructor(private store$: Store<AppStateInterface>) { }

  getLoading(): Observable<boolean> {
    return this.store$.pipe(select(isLoadingSelector));
  }

  getIsChartLoaded(): Observable<boolean> {
    return this.store$.select(isChartLoaded);
  }

  getIsCoinDataLoaded(): Observable<boolean> {
    return this.store$.select(isSelectedDataLoaded);
  }

  getCoinImage(): Observable<string> {
    return this.store$.pipe(select(coinImageSelector));
  }

  getTableData(): void {
    this.store$.dispatch(DashboardActions.getTableData());
  }

  getChartData(coinName: string): void {
    this.store$.dispatch(DashboardActions.loadChartData({coinName}));
  }

  patchCoinData(coinName: string): void {
    this.store$.dispatch(DashboardActions.loadCoinData({coinName}));
  }

  getCoinData():Observable<ICoinData>{
   return this.store$.pipe(select(coinDataSelector))
  }

  getCryptoData(): Observable<ITableData[]> {
    return this.store$.pipe(select(cryptoDataSelector));
  }

  getCoinPrice(): Observable<string> {
    return this.store$.pipe(select(coinPriceSelector));
  }

 

}
