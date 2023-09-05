import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  tradeInputGroup = new FormGroup({
    coinEquivalent: new FormControl(0),
    usdEquivalent: new FormControl(0)
  }); 
  constructor(){}
}
