import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';
import * as DashboardActions from '../../store/dashboard.actions'
import { Observable } from 'rxjs';
import { isLoadingSelector } from '../../store/dashboard.selectors';
import { AppStateInterface } from 'src/app/core/interfaces/app.state.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public username: string = 'Loading...';
  isLoading$: Observable<boolean>;
  constructor(private cryptoApiService: CryptoApiService, private store$: Store<AppStateInterface>){
    this.isLoading$ = this.store$.pipe(select(isLoadingSelector));
  }

  ngOnInit(): void {
      if(localStorage.getItem('username')){
        this.username = localStorage.getItem('username')!
      }
      this.store$.dispatch(DashboardActions.getTableData());
  }
}
