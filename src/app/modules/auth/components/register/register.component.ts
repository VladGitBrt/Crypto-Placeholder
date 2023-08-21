import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  constructor(private Auth: AuthService){}

  register(): void{
    console.log(this.registerFormGroup.value)
  }

  passMode(): void {
    this.showPassword = !this.showPassword
  }
}
