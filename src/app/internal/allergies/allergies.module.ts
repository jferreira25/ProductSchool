import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { AllergiesFormComponent } from './form/allergies-form.component';
import { AllergiesListComponent } from './list/allergies-list.component';
import { AllergiesRoutingModule } from './allergies-routing.module';

@NgModule({
  declarations: [
    AllergiesListComponent,
    AllergiesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AllergiesRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class AllergiesModule { }
