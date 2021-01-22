import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRoutingModule } from './external-routing.module';
import { ExternalComponent } from './external.component';
import { MaterialModule } from '../core/material.module';

@NgModule({
  declarations: [
    ExternalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ExternalRoutingModule
  ]
})
export class ExternalModule { }
