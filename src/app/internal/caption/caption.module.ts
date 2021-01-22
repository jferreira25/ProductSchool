import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { CaptionRoutingModule } from './caption-routing.module';
import { CaptionListComponent } from './list/caption-list.component';
import { CaptionFormComponent } from './form/caption-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox'

@NgModule({
  declarations: [
    CaptionListComponent,
    CaptionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CaptionRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    MatCheckboxModule,
  ]
})
export class CaptionModule { }
