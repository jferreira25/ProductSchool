import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './list/home.component';
import { RoleGuard } from 'src/app/common/auth-guards/role.guard';
import { RoleEnum } from 'src/app/common/enuns/role.enum';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [RoleGuard],
    data: { roles: [RoleEnum.ADMIN, RoleEnum.APPROVER, RoleEnum.USER] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
