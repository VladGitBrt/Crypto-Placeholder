import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

enum LoginMode {
  Login = 'login',
  Recovery = 'recovery',
  Confirm = 'confirm',
  Code = 'code'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMode: 'login' | 'recovery' | 'confirm' | 'code' = 'login';
  loginFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })
  showPassword: boolean = false;
  constructor(private router: Router, private auth: AuthService){}
  
  ngOnInit(): void {
      this.auth.test()
        .subscribe(data => {console.log(data )})
  }

  changeMode(entryMode: string):void {
    switch(entryMode) {
      case 'recover': 
        this.loginMode = LoginMode.Recovery
        break;
      case 'confirm': 
        this.loginMode = LoginMode.Confirm
        break;
      case 'code': 
        this.loginMode = LoginMode.Code
        break;
      case 'endCode': 
        this.loginMode = LoginMode.Login
        break;
    }
  }

  passMode(): void {
    this.showPassword = !this.showPassword
  }

  loginUser(): void {
    console.log(this.loginFormGroup.value)
  }

}
