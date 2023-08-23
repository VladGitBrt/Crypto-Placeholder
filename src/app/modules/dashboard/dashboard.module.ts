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
    SharedModule
  ]
})
export class DashboardModule { }
