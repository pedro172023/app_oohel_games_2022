import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PagosPage} from './pagos.page';
import {DetalleComponent} from "./detalle/detalle.component";

const routes: Routes = [
    {
        path: '',
        component: PagosPage,
        children: [
            {
                path: 'detalle-pago',
                component: DetalleComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagosPageRoutingModule {
}
