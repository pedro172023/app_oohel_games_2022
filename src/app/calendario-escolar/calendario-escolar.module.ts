import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CalendarioEscolarPageRoutingModule} from './calendario-escolar-routing.module';

import {CalendarioEscolarPage} from './calendario-escolar.page';
import {NgCalendarModule} from 'ionic2-calendar';


@NgModule({
    imports: [

        NgCalendarModule,
        CommonModule,
        FormsModule,
        IonicModule,
        CalendarioEscolarPageRoutingModule
    ],
    declarations: [CalendarioEscolarPage]
})
export class CalendarioEscolarPageModule {
}
