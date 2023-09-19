import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';
import { ICoinListResponse } from '../../model/dashboard.model';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  searchControl = new FormControl('');
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  @Output() selectedCoinName = new EventEmitter<string>();

  constructor(private cryptoApi: CryptoApiService){}

  ngOnInit() {
    this.cryptoApi.getCoinNameList()
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
}
