import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
	  detalles: any;
  	constructor(public modalController: ModalController, navParams: NavParams) {
        
        this.detalles = navParams.get('data');
     }

  	ngOnInit() {}

  	dismissModal() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
