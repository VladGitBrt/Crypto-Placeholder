import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from 'src/app/core/services/crypto-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public username: string = 'Loading...';
  constructor(private cryptoApiService: CryptoApiService){}

  ngOnInit(): void {
      if(localStorage.getItem('username')){
        this.username = localStorage.getItem('username')!
      }
      this.cryptoApiService.getCoinTableData()
  }
}
