import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/app/shared/classes/role';
import { AuthGuard } from 'src/app/shared/service/auth/auth.guard';
import { EtablissementComponent } from './etablissement.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'etablissement-crud ',
        component: EtablissementComponent,
        canActivate: [AuthGuard] ,
        data: {
          roles: [Role.SuperAdmin,Role.Admin],
          title: "etablissement",
          breadcrumb: "Etablissement"
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtablissementRoutingModule { }
