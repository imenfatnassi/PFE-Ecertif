import { OrganismeComponent } from './organisme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth/auth.guard';
import { Role } from 'src/app/shared/classes/role';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'organisme-crud',
        component: OrganismeComponent,
        canActivate: [AuthGuard] ,
        data: {
          roles: [Role.SuperAdmin,Role.Admin],
          title: "Organisme(s)",
          breadcrumb: "Organisme(s)"
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganismeRoutingModule { }
