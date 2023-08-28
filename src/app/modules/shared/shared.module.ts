import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    MatIconModule,
    CdkTableModule
  ]
})
export class SharedModule { }
