import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { MaterialModule } from '../core/material.module';
import { ComponentsModule } from '../common/components/components.module';

@NgModule({
  declarations: [InternalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    InternalRoutingModule
  ]
})
export class InternalModule { }
