import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser, IUserResponse } from 'src/app/core/interfaces/user.interface';
import { Subject, takeUntil } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

enum LoginMode {
  Login = 'login',
  Recovery = 'recovery',
  Confirm = 'confirm',
  Code = 'code'
}

type LoginStage = 'login' | 'recovery' | 'confirm' | 'code';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginStage: LoginStage  = 'login';
  loginFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })
  showPassword: boolean = false;
  private unsubscribe$ = new Subject<void>();
  constructor(private router: Router, private auth: AuthService, private localStorageService: LocalstorageService){}

  onLoginStageChange(selectedMode: string):void {
    switch(selectedMode) {
      case 'recover': 
        this.loginStage = LoginMode.Recovery
        break;
      case 'confirm': 
        this.loginStage = LoginMode.Confirm
        break;
      case 'code': 
        this.loginStage = LoginMode.Code
        break;
      case 'endCode': 
        this.loginStage = LoginMode.Login
        break;
    }
  }

  isShowPass(): void {
    this.showPassword = !this.showPassword
  }

  loginUser(): void {
      let loginForm: IUser = {
        username: this.loginFormGroup.value.email!,
        password: this.loginFormGroup.value.password!
      }
    this.auth.login(loginForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IUserResponse) => {
        this.localStorageService.setTokenAndNavigate(data)
      })
  }

  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
