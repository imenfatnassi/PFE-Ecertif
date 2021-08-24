import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from 'src/app/shared/classes/role';
import { AuthGuard } from 'src/app/shared/service/auth/auth.guard';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard] ,data: { roles: [Role.SuperAdmin,Role.Admin] },
    children: [
      {
        path: 'default',
        component: DashboardComponent,
        
        data: {
          title: "Dashboard",
          breadcrumb: "Dashboard"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
