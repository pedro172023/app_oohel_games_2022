import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutoriasPage } from './tutorias.page';
import {DetalleComponent} from './detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    component: TutoriasPage,
   	children: [
        {
            path: 'detalle',
            component: DetalleComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutoriasPageRoutingModule {}
