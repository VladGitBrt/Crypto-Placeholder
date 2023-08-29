import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ChartComponent } from './components/chart/chart.component';
import { SelectedCoinComponent } from './components/selected-coin/selected-coin.component';
import { MarketComponent } from './components/market/market.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/dashboard.reducers'
import { EffectsModule } from '@ngrx/effects';
import { CryptoDataEffects } from './store/dashboard.effects';


@NgModule({
  declarations: [
    DashboardComponent,
    CoinListComponent,
    CalculatorComponent,
    ChartComponent,
    SelectedCoinComponent,
    MarketComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard',reducers),
    EffectsModule.forFeature([CryptoDataEffects])
  ]
})
export class DashboardModule { }
