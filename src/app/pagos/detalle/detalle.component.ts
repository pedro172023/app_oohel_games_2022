import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
    private pago: any;

    constructor(public navParams: NavParams, public modalController: ModalController) {
        this.pago = this.navParams.get('pago');
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
