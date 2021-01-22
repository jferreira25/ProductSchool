import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { RestrictionFoodListComponent } from './list/restrictionFood-list.component';
import { RestrictionFoodFormComponent } from './form/restrictionFood-form.component';
import { RestrictionFoodRoutingModule } from './restrictionFood-routing.module';

@NgModule({
  declarations: [
    RestrictionFoodListComponent,
    RestrictionFoodFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestrictionFoodRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class RestrictionFoodModule { }
