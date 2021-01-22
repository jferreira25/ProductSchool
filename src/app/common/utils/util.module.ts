import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { UtilService } from './util.service';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    ComponentsModule
  ],
  providers: [
    UtilService
  ]
})
export class UtilModule { }
