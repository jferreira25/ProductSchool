import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/common/auth-guards/role.guard';
import { RoleEnum } from 'src/app/common/enuns/role.enum';
import { NotificationListComponent } from './list/notification-list.component';
import { NotificationDetailComponent } from './detail/notification-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent,
    canActivate: [RoleGuard],
    data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
  },
  {
    path: 'detail/:id',
    component: NotificationDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
