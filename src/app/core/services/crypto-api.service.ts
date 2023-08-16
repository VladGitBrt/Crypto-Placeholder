import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  private apiUrl: string = 'https://min-api.cryptocompare.com/data';

  constructor(private http: HttpClient) { }

 
}
