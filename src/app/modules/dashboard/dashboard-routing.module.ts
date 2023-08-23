import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ChartComponent } from './components/chart/chart.component';

//1. coin list, 2. calculator, 3. chart, 4. selected coin (by default list with coins for select)

const routes: Routes = [
  {
   path: '',
   component: DashboardComponent,
   children: [
    {
      path: 'list',
      component: CoinListComponent
    },
    {
      path: 'calculator',
      component: CalculatorComponent
    },
    {
      path: 'chart',
      component: ChartComponent
    }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
