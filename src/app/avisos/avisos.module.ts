import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosPageRoutingModule } from './avisos-routing.module';

import { AvisosPage } from './avisos.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosPageRoutingModule,
    PipesModule
  ],
  declarations: [AvisosPage]
})
export class AvisosPageModule {}
