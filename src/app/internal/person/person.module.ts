import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { PersonFormComponent } from './form/person-form-component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './list/person-list-component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonFormComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    MatCheckboxModule,
    HttpClientModule,
    MatChipsModule
  ]
})
export class PersonModule { }
