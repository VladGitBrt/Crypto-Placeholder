import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DashboardActions from './dashboard.actions'
import { map, mergeMap, switchMap } from 'rxjs';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';

@Injectable()
export class CryptoDataEffects {

    
    getCryptoData$ = createEffect(() =>
        this.actions$.pipe(ofType(DashboardActions.getTableData), mergeMap(()=>{
            return this.cryptoService.getCoinTableData().pipe(map(data => DashboardActions.getTableDataSuccess({tableData: data})));
        }))
    );

    loadCoinData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadCoinData),
      switchMap((action) =>
        this.cryptoService.getCoinDataByName(action.coinName).pipe(
          map((coinData) => DashboardActions.loadCoinDataSuccess({ coinData }))
          )
        )
      )
    );

    loadChartData$ = createEffect(() => 
    this.actions$.pipe(
      ofType(DashboardActions.loadChartData),
      switchMap((action) => 
        this.cryptoService.getChartData(action.coinName).pipe(
          map((chartData) => DashboardActions.loadChartDataSuccess({ chartData }))
        )
      )
    )
    );

    constructor(private actions$: Actions, private cryptoService: CryptoApiService){}
}