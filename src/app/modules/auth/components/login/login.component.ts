import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/core/interfaces/user.interface';

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
export class LoginComponent {
  loginStage: LoginStage  = 'login';
  loginFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })
  showPassword: boolean = false;
  constructor(private router: Router, private auth: AuthService){}

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
    console.log(this.loginFormGroup.value);
      let loginForm: IUser = {
        username: this.loginFormGroup.value.email!,
        password: this.loginFormGroup.value.password!
      }
    this.auth.login(loginForm)
      .subscribe(data => {
        localStorage.setItem('token',data.access_token)
        localStorage.setItem('username',data.username)
        this.router.navigate(['/dashboard'])
      })
  }

}
