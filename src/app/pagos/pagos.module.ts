import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PagosPageRoutingModule} from './pagos-routing.module';

import {PagosPage} from './pagos.page';
import {DetalleComponent} from "./detalle/detalle.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PagosPageRoutingModule
    ],
    declarations: [PagosPage, DetalleComponent]
})
export class PagosPageModule {
}
