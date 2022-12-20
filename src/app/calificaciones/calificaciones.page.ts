import { Component, OnInit } from '@angular/core';
import { AlumnosService } from "../services/alumnos.service";
import { Auth0Service } from "../services/auth0.service";
import { ResponseApi } from "../services/ResponseApi";
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { ComunService } from '../services/comun.service';

@Component({
    selector: 'app-calificaciones',
    templateUrl: './calificaciones.page.html',
    styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {

    ttoken: null;
    calificaciones: any = {};
    isLoading: boolean = false;

    constructor(public auth0: Auth0Service,
        public CServices: AlumnosService,
        public router: Router,
        private loadingController: LoadingController,
        private comunservice: ComunService,
        public toastController: ToastController) {
    }

    ngOnInit() {
        this.CServices.inicializar_token();
        this.getCalificacionesAlumno();
    }

    async getCalificacionesAlumno(event?) {
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 1000
        });
        await loading.present();
        this.setIsLoading(true);
        this.CServices.getCalificacionesAlumno().subscribe((data: ResponseApi) => {
            setTimeout(() => {
                this.calificaciones = data.data.calificaciones;
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
        this.getCalificacionesAlumno(event);
    }

}
