import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITableData } from '../../model/dashboard.model';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/core/interfaces/app.state.interface';
import { Observable } from 'rxjs';
import { cryptoDataSelector } from '../../store/dashboard.selectors';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'coinName', 'coinPrice', 'dailyPercent','dailyHigh','dailyLow'];
  cryptoData$?: Observable<ITableData[]>;
  dataSource = new MatTableDataSource<ITableData>([]);

  constructor(private store: Store<AppStateInterface>, private cryptoApi: CryptoApiService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.cryptoData$ = this.store.pipe(select(cryptoDataSelector));
    this.cryptoData$.subscribe(data => {
      this.dataSource = new MatTableDataSource<ITableData>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectCoin(coinName: ITableData['coinName']) {
    this.cryptoApi.getCoinDataByName(coinName)
      .subscribe(data => console.log(data.RAW))
  }
}
