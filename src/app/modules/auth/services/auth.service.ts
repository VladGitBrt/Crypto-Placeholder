import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:5000/api/auth'
  constructor(private http: HttpClient) {
  }

  public login({username,password}:{username: any,password: any}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,{username,password})
  }

  public register({username,password}:{username: any,password: any}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,{username,password})
  }
}
