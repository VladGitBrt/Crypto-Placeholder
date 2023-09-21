import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/core/interfaces/app.state.interface';
import { coinDataSelector, coinImageSelector, coinPriceSelector, isSelectedDataLoaded } from '../../store/dashboard.selectors';
import { Observable, from, of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { ICoinData } from '../../model/dashboard.model';



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  coinImageUrl$?: Observable<string>;
  isDataLoaded$: Observable<boolean>;
  coinPrice$?: Observable<string>;
  coinName: string = 'Loading...';
  totalExchangeResult: string = '0';
  tradeInputGroup!: FormGroup; 
  constructor(private store$: Store<AppStateInterface>, private _snackBar: MatSnackBar){
    this.store$.pipe(select(coinDataSelector))
      .subscribe((coinData: ICoinData) => {
        this.coinName = coinData.coinName
      })
    this.coinPrice$ = this.store$.pipe(select(coinPriceSelector));
    this.coinPrice$
      .subscribe(price => {
        this.tradeInputGroup = new FormGroup({
          coinEquivalent: new FormControl(0),
          usdEquivalent: new FormControl(price)
        }); 
      })
    this.coinImageUrl$ = this.store$.pipe(select(coinImageSelector));
    this.isDataLoaded$ = this.store$.select(isSelectedDataLoaded);
  }

  openSnackBar(snackAction: string) {
    snackAction === 'buy'? this._snackBar.open(`You successfully bought ${this.tradeInputGroup.value.coinEquivalent} (${this.coinName}) for $${Number(this.totalExchangeResult).toFixed(2)}`, 'Dismiss') 
    : this._snackBar.open(`You successfully sold ${this.tradeInputGroup.value.coinEquivalent} ${this.coinName} for $${Number(this.totalExchangeResult).toFixed(2)}`, 'Dismiss')
  }

  coinEquivalentChange():void {
      this.totalExchangeResult = ((this.tradeInputGroup.value.coinEquivalent * this.tradeInputGroup.value.usdEquivalent)+(this.tradeInputGroup.value.coinEquivalent * this.tradeInputGroup.value.usdEquivalent)*0.02).toString()
  } 
}
