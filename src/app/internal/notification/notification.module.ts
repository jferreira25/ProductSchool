import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { NotificationListComponent } from './list/notification-list.component';
import { NotificationDetailComponent } from './detail/notification-detail.component';

@NgModule({
  declarations: [NotificationListComponent, NotificationDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class NotificationModule { }
