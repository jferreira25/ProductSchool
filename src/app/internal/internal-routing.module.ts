import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalComponent } from './internal.component';

const routes: Routes = [
  {
    path: '', component: InternalComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'caption', loadChildren: () => import('./caption/caption.module').then(m => m.CaptionModule) },
      { path: 'person', loadChildren: () => import('./person/person.module').then(m => m.PersonModule) },
      { path: 'allergies', loadChildren: () => import('./allergies/allergies.module').then(m => m.AllergiesModule) },
      { path: 'restrictionFood', loadChildren: () => import('./restrictionFood/restrictionFood.module').then(m => m.RestrictionFoodModule) },
      
     
      { path: 'notifications', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) },
     

      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
