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
  public loadingSelector$ = this.store$.pipe(select(isLoadingSelector));
  public isChartLoaded$ = this.store$.select(isChartLoaded);
  public isSelectedDataLoaded$ = this.store$.select(isSelectedDataLoaded);
  public coinImageSelector$ = this.store$.pipe(select(coinImageSelector));
  public coinDataSelector$ = this.store$.pipe(select(coinDataSelector))
  public cryptoDataSelector$ = this.store$.pipe(select(cryptoDataSelector));
  public coinPriceSelector$ = this.store$.pipe(select(coinPriceSelector));
  constructor(private store$: Store<AppStateInterface>) { }

  getTableData(): void {
    this.store$.dispatch(DashboardActions.getTableData());
  }

  getChartData(coinName: string): void {
    this.store$.dispatch(DashboardActions.loadChartData({coinName}));
  }

  patchCoinData(coinName: string): void {
    this.store$.dispatch(DashboardActions.loadCoinData({coinName}));
  }

}
