import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser, IUserResponse } from 'src/app/core/interfaces/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnDestroy {
  showPassword: boolean = false;
  private unsubscribe$ = new Subject<void>();

  registerFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    repass: new FormControl('',[Validators.required]),
    terms: new FormControl('',[Validators.required])
  })
  constructor(private Auth: AuthService, private router: Router, private localStorageService: LocalstorageService){}

  register(): void{
    let registerForm: IUser = {
      username: this.registerFormGroup.value.email!,
      password: this.registerFormGroup.value.password!
    }
    this.Auth.register(registerForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IUserResponse) => {
        this.localStorageService.setTokenAndNavigate(data)
      })
  }

  passMode(): void {
    this.showPassword = !this.showPassword
  }

  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
