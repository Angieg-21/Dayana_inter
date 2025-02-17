import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicoComponent } from './academico.component';
import { AuthGuard } from '../shared/gaurd/auth.guard';
import { LoginGuard } from '../shared/gaurd/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AcademicoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'docente',
        loadChildren: () =>
          import('./docente/docente.module').then((m) => m.DocenteModule),
      },
      {
        path: 'estudiante',
        loadChildren: () =>
          import('./Estudiante/estudiante.module').then((m) => m.EstudiantetModule),
      },
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      {
        path: 'atenciones',
        loadChildren: () =>
          import('./atenciones/atenciones.module').then((m) => m.AtencionesModule),
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

      {
        path: 'carreras',
        loadChildren: () =>
          import('./carreras/carreras.module').then((m) => m.CarreraModule),
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicoRoutingModule { }
