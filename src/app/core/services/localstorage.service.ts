import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private router: Router) { }

  setTokenAndNavigate(data: IUserResponse): void {
        localStorage.setItem('token',data.access_token)
        localStorage.setItem('username',data.username)
        this.router.navigate(['/dashboard'])  
  }
}
