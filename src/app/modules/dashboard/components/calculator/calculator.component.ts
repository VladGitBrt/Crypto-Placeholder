import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICoinData } from '../../model/dashboard.model';
import { DashboardFacade } from '../../store/dashboard-facade.service';



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnDestroy {
  coinImageUrl$?: Observable<string>;
  isDataLoaded$: Observable<boolean>;
  coinPrice$?: Observable<string>;
  coinName: string = 'Loading...';
  totalExchangeResult: string = '0';
  tradeInputGroup!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(private _snackBar: MatSnackBar, private dashboardFacade: DashboardFacade){
    this.dashboardFacade.getCoinData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((coinData: ICoinData) => {
        this.coinName = coinData.coinName
      })
    this.coinPrice$ = this.dashboardFacade.getCoinPrice();
    this.coinPrice$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(price => {
        this.tradeInputGroup = new FormGroup({
          coinEquivalent: new FormControl(0),
          usdEquivalent: new FormControl(price)
        }); 
      })
    this.coinImageUrl$ = this.dashboardFacade.getCoinImage();
    this.isDataLoaded$ = this.dashboardFacade.getIsCoinDataLoaded();
  }

  openSnackBar(snackAction: string) {
    snackAction === 'buy'? this._snackBar.open(`You successfully bought ${this.tradeInputGroup.value.coinEquivalent} (${this.coinName}) for $${Number(this.totalExchangeResult).toFixed(2)}`, 'Dismiss') 
    : this._snackBar.open(`You successfully sold ${this.tradeInputGroup.value.coinEquivalent} ${this.coinName} for $${Number(this.totalExchangeResult).toFixed(2)}`, 'Dismiss')
  }

  coinEquivalentChange():void {
      this.totalExchangeResult = ((this.tradeInputGroup.value.coinEquivalent * this.tradeInputGroup.value.usdEquivalent)+(this.tradeInputGroup.value.coinEquivalent * this.tradeInputGroup.value.usdEquivalent)*0.02).toString()
  } 

  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
