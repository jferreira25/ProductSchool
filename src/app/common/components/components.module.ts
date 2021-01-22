import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material.module';
import { ActionBottomSheetComponent } from './action-bottom-sheet/action-bottom-sheet.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NotificationBarComponent } from './toolbar/notification-bar/notification-bar.component';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS,MatCheckboxModule,MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { LabelComponent } from './label/label.component';
import { InputMaskComponent } from './input-mask/input-mask.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    ActionBottomSheetComponent,
    InputComponent,
    InputMaskComponent,
    SelectComponent,
    ConfirmDialogComponent,
    SidemenuComponent,
    ToolbarComponent,
    RadioButtonComponent,
    ToggleButtonComponent,
    DatePickerComponent,
    ErrorDialogComponent,
    NotificationBarComponent,
    LabelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [
    InputComponent,
    InputMaskComponent,
    SelectComponent,
    SidemenuComponent,
    ToolbarComponent,
    RadioButtonComponent,
    ToggleButtonComponent,
    DatePickerComponent,
    LabelComponent
  ],
  entryComponents: [
    ActionBottomSheetComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    },
    { 
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill' 
      } 
    }
  ]
})
export class ComponentsModule { }
