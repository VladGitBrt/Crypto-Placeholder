import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//1. coin list, 2. calculator, 3. chart, 4. selected coin (by default list with coins for select)

const routes: Routes = [
  {
   path: '',
   component: DashboardComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
