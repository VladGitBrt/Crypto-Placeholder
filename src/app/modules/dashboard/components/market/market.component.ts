import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';
import { ICoinListResponse } from '../../model/dashboard.model';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  private unsubscribe$ = new Subject<void>();

  @Output() selectedCoinName = new EventEmitter<string>();

  constructor(private cryptoApi: CryptoApiService){}

  ngOnInit() {
    this.cryptoApi.getCoinNameList()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((response: ICoinListResponse) => {
      this.options = Object.values(response.Data).map(item => item.symbol);
      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectedCoin(event: any):void {
    this.selectedCoinName.emit(event.option.value);
  }

  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
