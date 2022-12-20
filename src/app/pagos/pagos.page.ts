import {Component, OnInit} from '@angular/core';
import {PagosService} from "../services/pagos.service";
import {LoadingController, ModalController} from "@ionic/angular";
import {ResponseApi} from "../services/ResponseApi";
import {DetalleComponent} from "./detalle/detalle.component";
import { ComunService } from '../services/comun.service';

@Component({
    selector: 'app-pagos',
    templateUrl: './pagos.page.html',
    styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
    pagos: any = {};
    isLoading: boolean = false;
    constructor(private sPagos: PagosService, 
        private loadingController: LoadingController, 
        private comunservice: ComunService,
        public modalController: ModalController) {

    }

    ngOnInit() {
        this.sPagos.inicializar_token();
        this.getPagosPendientes()
    }

    async getPagosPendientes(event?) {
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 1000
        });
        await loading.present();
        this.isLoading = true;
        this.sPagos.getRecibosPendientes().subscribe((res: ResponseApi) => {
            setTimeout(() => {
                this.pagos = res.data.pagos;
                this.isLoading = false;
                if (event) {
                    event.target.complete();
                }
            }, 1000);
        }, err => {
            this.comunservice.tokenExpired(err);
            this.comunservice.messageToast('Ha ocurrido un error, intentalo mas tarde.',3000)
        })
    }

    async ver_detalle_recibo(pago: any) {
        const modal = await this.modalController.create({
            component: DetalleComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'pago': pago
            }
        });
        return await modal.present();
    }
}
