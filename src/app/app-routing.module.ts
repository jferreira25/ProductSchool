import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/auth-guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./external/external.module').then(m => m.ExternalModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./internal/internal.module').then(m => m.InternalModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
