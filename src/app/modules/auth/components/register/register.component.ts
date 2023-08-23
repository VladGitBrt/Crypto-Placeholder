import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  showPassword: boolean = false;


  registerFormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    repass: new FormControl('',[Validators.required]),
    terms: new FormControl('',[Validators.required])
  })
  constructor(private Auth: AuthService, private router: Router){}

  register(): void{
    let registerForm = {
      username: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.password
    }
    this.Auth.register(registerForm)
      .subscribe(data => {
        localStorage.setItem('token',data.access_token),
        localStorage.setItem('username',data.username)
        this.router.navigate(['/dashboard'])
      })
  }

  passMode(): void {
    this.showPassword = !this.showPassword
  }
}
