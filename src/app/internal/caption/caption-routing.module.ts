import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleGuard } from 'src/app/common/auth-guards/role.guard';
import { RoleEnum } from 'src/app/common/enuns/role.enum';
import { CaptionFormComponent } from './form/caption-form.component';
import { CaptionListComponent } from './list/caption-list.component';

const routes: Routes = [
    {
      path: '',
      component: CaptionListComponent,
      canActivate: [RoleGuard],
      data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    },
    {
      path: 'add',
      component: CaptionFormComponent,
      canActivate: [RoleGuard],
      data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    },
    // {
    //   path: 'add/:id',
    //   component: AirportFormComponent,
    //   canActivate: [RoleGuard],
    //   data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    // },
    // {
    //   path: 'formula/add/:id',
    //   component: AirportFormulaFormComponent,
    //   canActivate: [RoleGuard],
    //   data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CaptionRoutingModule { }
  