import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioEscolarPage } from './calendario-escolar.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioEscolarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioEscolarPageRoutingModule {}
