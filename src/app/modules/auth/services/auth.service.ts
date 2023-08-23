import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserResponse } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:5000/api/auth'
  constructor(private http: HttpClient) {
  }

  public login({username,password}:IUser): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.apiUrl}/login`,{username,password})
  }

  public register({username,password}:IUser): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.apiUrl}/register`,{username,password})
  }
}
