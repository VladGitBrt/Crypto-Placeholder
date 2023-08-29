import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatSortModule
  ]
})
export class SharedModule { }
