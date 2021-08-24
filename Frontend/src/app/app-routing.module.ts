import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [

  /* For Racine */
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: 'Dashboard',
   //redirectTo: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
