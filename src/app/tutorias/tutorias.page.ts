import { Component, OnInit } from '@angular/core';
import { AlumnosService } from "../services/alumnos.service";
import { Auth0Service } from "../services/auth0.service";
import { ResponseApi } from "../services/ResponseApi";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { DetalleComponent } from './detalle/detalle.component';
import { ComunService } from '../services/comun.service';

@Component({
    selector: 'app-tutorias',
    templateUrl: './tutorias.page.html',
    styleUrls: ['./tutorias.page.scss'],
})
export class TutoriasPage implements OnInit {

    ttoken: null;
    tutorias: any = {};
    isLoading: boolean = false;
    detalles: any;

    constructor(private route: ActivatedRoute,
        public auth0: Auth0Service,
        public AServices: AlumnosService,
        public router: Router,
        private comunservice: ComunService,
        private loadingController: LoadingController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public toastController: ToastController) {
    }

    ngOnInit() {
        this.getTutoriasAlumno();
    }

    async getTutoriasAlumno(event?) {
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 1000
        });
        await loading.present();
        this.isLoading = true;
        this.AServices.getTutoriasAlumno().subscribe((data: ResponseApi) => {
            setTimeout(() => {
                this.tutorias = data.data.tutorias;
                this.setIsLoading(false);
                if (event) {
                  event.target.complete();
                }
              }, 1000);
        }, error => {
            this.comunservice.tokenExpired(error);
            this.comunservice.messageToast('Ha ocurrido un error, intentalo mas tarde.',3000)
        });
    }

    setIsLoading(value) {
        this.isLoading = value;
    }

    doRefresh(event) {
        this.getTutoriasAlumno(event);
    }

    verDetalles(item) {
        this.detalles = item;
        if (this.detalles) {
            this.openModal(DetalleComponent, this.detalles);
        }
        else {
            let subHeader = 'Lo sentimos, intentelo mas tarde';
            this.openAlert(subHeader);
        }
    }

    async openAlert(subHeader) {
        const alert = await this.alertCtrl.create({
            header: 'Sin resultados',
            subHeader: subHeader,
            message: 'No se pudo cargar la información',
            buttons: ['OK']
        });

        await alert.present();
    }

    async openModal(component, data) {
        const modal = await this.modalCtrl.create({
            component: component,
            componentProps: {
                'data': data,
            }
        });
        return await modal.present();
    }


}
