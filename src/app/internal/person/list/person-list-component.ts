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
import { PersonService } from 'src/app/common/services/person.service';
import { Person } from 'src/app/common/models/person';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list-component.html',
    styleUrls: ['./person-list-component.css']
  })
  export class PersonListComponent implements OnInit {
  
    public form: FormGroup;
    public dspersons: MatTableDataSource<string>;

    constructor(
      private builder: FormBuilder,
      private router: Router,
      private routeStack: RouteStackService,
      private bottomSheet: MatBottomSheet,
      private util: UtilService,
      private personService: PersonService
    ) {
      this.form = this.createFormGroup();
      this.dspersons = new MatTableDataSource();
    }
  
    ngOnInit() {
      this.filter();
    }
  
  public filter(): void {
    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }

    // const filters = this.util.convertDateToString(this.form.value);
  
    this.personService.filter(this.form.value).subscribe((res: Person[]) => {
      this.dspersons = res["Persons"];
     });
    // this.notificationService.mustUpdate();
    // this.notificationService.filter(filters).subscribe((res: Paginator<Notification>) => {
    //   this.notificationPaginated = res;
    //   this.dsNotifications.data = res.list;
    // });
  }
  
  public clearFilter(): void {
    this.form.controls.name.setValue('');
    this.form.controls.referenceDateStart.setValue('');
    this.form.controls.referenceDateEnd.setValue('');
 
    this.form.controls.currentPage.setValue(0);
    this.form.controls.pageLength.setValue(10);
    this.filter();
  }
  
    public pageChangeEvent(pageEvent: PageEvent): void {
      this.form.controls.currentPage.setValue(pageEvent.pageIndex);
      this.form.controls.pageLength.setValue(pageEvent.pageSize);
      this.filter();
    }

    private createFormGroup(): FormGroup {
        return this.builder.group({
          name:['',[]],
          referenceDateStart: ['', []],
          referenceDateEnd: ['', []],
          currentPage: [0, []],
          pageLength: [10, []]
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
          description: 'Alterar Cadastro',
          hidden: false,
          action: () => {
            this.routeStack.goTo(this.router, 'app/person/add', id);
          }
        }
      ];
    }

    public add(): void {
      this.routeStack.goTo(this.router, 'app/person/add');
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