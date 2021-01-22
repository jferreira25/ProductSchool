import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatBottomSheet, PageEvent } from '@angular/material';
import { Paginator } from 'src/app/common/models/paginator';
import { Router } from '@angular/router';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { ActionBottomSheetComponent } from 'src/app/common/components/action-bottom-sheet/action-bottom-sheet.component';
import { ActionBottomSheet } from 'src/app/common/models/action-bottom-sheet';
import { UtilService } from 'src/app/common/utils/util.service';
import { Allergies } from 'src/app/common/models/allergies';
import { AllergiesService } from 'src/app/common/services/allergies.service';

@Component({
    selector: 'app-allergies-list',
    templateUrl: './allergies-list.component.html',
    styleUrls: ['./allergies-list.component.css']
  })
  export class AllergiesListComponent implements OnInit {
  
    public form: FormGroup;
    public dsAllergies: MatTableDataSource<Allergies>;
  
    constructor(
      private builder: FormBuilder,
      private router: Router,
      private routeStack: RouteStackService,
      private bottomSheet: MatBottomSheet,
      private util: UtilService,
      private allergiesService: AllergiesService
      
    ) {
      this.form = this.createFormGroup();
      this.dsAllergies = new MatTableDataSource();
    }
  
    ngOnInit() {
      this.filter();
      this.dsAllergies = new MatTableDataSource();
    }
  
  public filter(): void {
    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }

     this.allergiesService.filter(this.form.value).subscribe((res: Allergies[]) => {
      this.dsAllergies = res["Allergies"];
     });
  }
  
  public clearFilter(): void {
    this.form.controls.name.setValue('');
    this.form.controls.currentPage.setValue(0);
    this.form.controls.pageLength.setValue(10);
    this.filter();
  }

  public add(): void {
    this.routeStack.goTo(this.router, 'app/allergies/add');
  }
  
    public pageChangeEvent(pageEvent: PageEvent): void {
      this.form.controls.currentPage.setValue(pageEvent.pageIndex);
      this.form.controls.pageLength.setValue(pageEvent.pageSize);
      this.filter();
    }

    private createFormGroup(): FormGroup {
        return this.builder.group({
          name: ['', [
            CustomValidator.maxLength(100),
            CustomValidator.minLength(5)
          ]]
        });
      }
  
    public openBottomSheet(id: any): void {
      var bt = this.bottomSheet.open(ActionBottomSheetComponent, {
        data: this.createAction(id)
      });
  
      bt.afterDismissed().subscribe((actionBottomSheet: ActionBottomSheet) => {
        if (actionBottomSheet)
          actionBottomSheet.action();
      });
    }
  
    private createAction(id: any): ActionBottomSheet[] {
      return [
        {
          icon: 'edit',
          id: id,
          class: '',
          title: 'Alterar',
          description: 'Alterar nome alergia',
          hidden: false,
          action: () => {
            this.routeStack.goTo(this.router, 'app/allergies/add', id);
          }
        }
      ];
    }
  
//     private createFormGroup(): FormGroup {
//       return this.builder.group({
//         name: ['', [
//           CustomValidator.maxLength(250)
//         ]],
//         iata: ['', [
//           CustomValidator.maxLength(250)
//         ]],
//         icao: ['', [
//           CustomValidator.maxLength(250)
//         ]],
//         country: ['', [
//           CustomValidator.autoComplete
//         ]],
//         currentPage: [0, []],
//         pageLength: [10, []]
//       });
//     }
//   }
}