import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/core/interfaces/app.state.interface';
import { coinImageSelector, coinPriceSelector, isSelectedDataLoaded } from '../../store/dashboard.selectors';
import { Observable, from, of } from 'rxjs';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  coinImageUrl$?: Observable<string>;
  isDataLoaded$: Observable<boolean>;
  coinPrice$?: Observable<string>;
  tradeInputGroup = new FormGroup({
    coinEquivalent: new FormControl(),
    usdEquivalent: new FormControl()
  }); 
  constructor(private store$: Store<AppStateInterface>){
    this.tradeInputGroup.value.coinEquivalent = this.store$.pipe(select(coinPriceSelector))
    this.coinPrice$ = this.store$.pipe(select(coinPriceSelector));
    this.coinImageUrl$ = this.store$.pipe(select(coinImageSelector));
    this.isDataLoaded$ = this.store$.select(isSelectedDataLoaded);
  }
}
