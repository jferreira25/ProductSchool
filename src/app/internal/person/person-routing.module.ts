import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleGuard } from 'src/app/common/auth-guards/role.guard';
import { RoleEnum } from 'src/app/common/enuns/role.enum';
import { PersonFormComponent } from './form/person-form-component';
import { PersonListComponent } from './list/person-list-component';


const routes: Routes = [
    {
      path: '',
      component: PersonListComponent,
      canActivate: [RoleGuard],
      data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    },
    {
      path: 'add',
      component: PersonFormComponent,
      canActivate: [RoleGuard],
      data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    },
    {
      path: 'add/:id',
      component: PersonFormComponent,
      canActivate: [RoleGuard],
      data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PersonRoutingModule { }
  