import { AfterViewInit, Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITableData } from '../../model/dashboard.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DashboardFacade } from '../../store/dashboard-facade.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'coinName', 'coinPrice', 'dailyPercent','dailyHigh','dailyLow'];
  cryptoData$?: Observable<ITableData[]>;
  dataSource = new MatTableDataSource<ITableData>([]);
  private unsubscribe$ = new Subject<void>();

  @Output() selectedCoin = new EventEmitter<string>();

  constructor(private dashboardFacade: DashboardFacade){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.cryptoData$ = this.dashboardFacade.getCryptoData();
    this.cryptoData$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.dataSource = new MatTableDataSource<ITableData>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectCoin(coinName: ITableData['coinName']) {
    this.selectedCoin.emit(coinName);
  }

  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
