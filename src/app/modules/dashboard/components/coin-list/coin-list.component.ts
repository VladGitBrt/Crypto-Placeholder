import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ITableData {
  number: string;
  coinName: string;
  coinPrice: string;
  dailyPercent: string;
  dailyHigh: string;
  dailyLow: string;
  imageUrl: string;
}

const mockTableData: ITableData[] = [
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  {
    number: "1",
    coinName: "string",
    coinPrice: "string",
    dailyPercent: "string",
    dailyHigh: "string",
    dailyLow: "string",
    imageUrl: 'sample'
  },
  
]

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'coinName', 'coinPrice', 'dailyPercent','dailyHigh','dailyLow'];
  dataSource = new MatTableDataSource<ITableData>(mockTableData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
