import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatBottomSheet, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { ActionBottomSheetComponent } from 'src/app/common/components/action-bottom-sheet/action-bottom-sheet.component';
import { ActionBottomSheet } from 'src/app/common/models/action-bottom-sheet';
import { UtilService } from 'src/app/common/utils/util.service';
import { RestrictionFoods } from 'src/app/common/models/restrictionFoods';
import { RestrictionFoodService } from 'src/app/common/services/restrictionFood.service';

@Component({
    selector: 'app-restrictionFood-list',
    templateUrl: './restrictionFood-list.component.html',
    styleUrls: ['./restrictionFood-list.component.css']
  })
  export class RestrictionFoodListComponent implements OnInit {
  
    public form: FormGroup;
    public dsRestrictionFood: MatTableDataSource<RestrictionFoods>;
  
    constructor(
      private builder: FormBuilder,
      private router: Router,
      private routeStack: RouteStackService,
      private bottomSheet: MatBottomSheet,
      private util: UtilService,
      private restrictionFoodService: RestrictionFoodService
      
    ) {
      this.form = this.createFormGroup();
      this.dsRestrictionFood = new MatTableDataSource();
    }
  
    ngOnInit() {
      this.filter();
      this.dsRestrictionFood = new MatTableDataSource();
    }
  
  public filter(): void {
    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }

     this.restrictionFoodService.filter(this.form.value).subscribe((res: RestrictionFoods[]) => {
      this.dsRestrictionFood = res["RestrictionFoods"];
     });
  }
  
  public clearFilter(): void {
    this.form.controls.name.setValue('');
    this.form.controls.currentPage.setValue(0);
    this.form.controls.pageLength.setValue(10);
    this.filter();
  }

  public add(): void {
    this.routeStack.goTo(this.router, 'app/restrictionFood/add');
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
          description: 'Alterar resstrição alimentar',
          hidden: false,
          action: () => {
            this.routeStack.goTo(this.router, 'app/restrictionFood/add', id);
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