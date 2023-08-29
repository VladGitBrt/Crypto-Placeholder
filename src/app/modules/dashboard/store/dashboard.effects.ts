import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DashboardActions from './dashboard.actions'
import { map, mergeMap } from 'rxjs';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';

@Injectable()
export class CryptoDataEffects {
    getCryptoData$ = createEffect(() =>
        this.actions$.pipe(ofType(DashboardActions.getTableData), mergeMap(()=>{
            return this.cryptoService.getCoinTableData().pipe(map(data => DashboardActions.getTableDataSuccess({tableData: data})));
        }))
    )

    constructor(private actions$: Actions, private cryptoService: CryptoApiService){}
}