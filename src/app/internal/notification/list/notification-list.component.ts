import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStackService } from 'src/app/common/services/route-stack.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { Notification } from 'src/app/common/models/notification';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Paginator } from 'src/app/common/models/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CustomValidator } from 'src/app/common/utils/custom-validator';
import { ActionBottomSheetComponent } from 'src/app/common/components/action-bottom-sheet/action-bottom-sheet.component';
import { PageEvent } from '@angular/material/paginator';
import { ActionBottomSheet } from 'src/app/common/models/action-bottom-sheet';
import { UtilService } from 'src/app/common/utils/util.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  public form: FormGroup;
  public dsNotifications: MatTableDataSource<Notification>;
  public notificationPaginated: Paginator<Notification>;
  public isVisualizedOptions: any[];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private routeStack: RouteStackService,
    private bottomSheet: MatBottomSheet,
    private util: UtilService,
    private notificationService: NotificationService
  ) {
    this.form = this.createFormGroup();
    this.dsNotifications = new MatTableDataSource();
  }

  ngOnInit() {
    this.createIsVisualizedOptions();
    this.filter();
  }

  public filter(): void {
    if (this.form.invalid) {
      CustomValidator.showErrors(this.form);
      return;
    }

    const filters = this.util.convertDateToString(this.form.value);

    this.notificationService.mustUpdate();
    this.notificationService.filter(filters).subscribe((res: Paginator<Notification>) => {
      this.notificationPaginated = res;
      this.dsNotifications.data = res.list;
    });
  }

  public clearFilter(): void {
    this.form.controls.title.setValue('');
    this.form.controls.description.setValue('');
    this.form.controls.referenceDateStart.setValue('');
    this.form.controls.referenceDateEnd.setValue('');
    this.form.controls.isVisualized.setValue('');
    this.form.controls.currentPage.setValue(0);
    this.form.controls.pageLength.setValue(10);
    this.filter();
  }

  public pageChangeEvent(pageEvent: PageEvent): void {
    this.form.controls.currentPage.setValue(pageEvent.pageIndex);
    this.form.controls.pageLength.setValue(pageEvent.pageSize);
    this.filter();
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

  private createIsVisualizedOptions(): void {
    this.isVisualizedOptions = [
      {
        value: true,
        label: 'Visualizadas'
      },
      {
        value: false,
        label: 'Não visualizadas'
      }
    ];
  }

  private createAction(notification: Notification): ActionBottomSheet[] {
    return [
      {
        icon: 'check',
        id: notification.id,
        class: '',
        title: 'Visualizar',
        description: 'Marcar como visualizado',
        hidden: notification.isVisualized,
        action: () => {
          this.util.confirmMsg('Deseja marcar a notificação como visualizada?').subscribe(res => {
            if (res) {
              this.notificationService.visualize(notification.id).subscribe(() => {
                this.util.snackMsg('Notificação marcada como visualizada!');
                this.filter();
              });
            }
          });
        }
      },
      {
        icon: 'list_alt',
        id: notification.id,
        class: '',
        title: 'Detalhes',
        description: 'Detalhes da notificação',
        hidden: false,
        action: () => {
          this.routeStack.goTo(this.router, 'app/notifications/detail', notification.id);
        }
      }
    ];
  }

  private createFormGroup(): FormGroup {
    return this.builder.group({
      title: ['', [
        CustomValidator.maxLength(250)
      ]],
      description: ['', [
        CustomValidator.maxLength(800)
      ]],
      referenceDateStart: ['', []],
      referenceDateEnd: ['', []],
      isVisualized: ['', [
        CustomValidator.autoComplete
      ]],
      currentPage: [0, []],
      pageLength: [10, []]
    });
  }
}
