import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/app/shared/classes/role';
import { AuthGuard } from 'src/app/shared/service/auth/auth.guard';
import { SmsComponent } from './sms.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sms-action',
        component: SmsComponent,
        canActivate: [AuthGuard] ,
        data: {
          roles: [Role.SuperAdmin,Role.Admin],
          title: "sms",
          breadcrumb: "Sms"
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
