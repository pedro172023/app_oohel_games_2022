import { Component, OnInit } from '@angular/core';
import { AlumnosService } from "../services/alumnos.service";
import { Auth0Service } from "../services/auth0.service";
import { ResponseApi } from "../services/ResponseApi";
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { ComunService } from '../services/comun.service';

@Component({
    selector: 'app-lista-tareas',
    templateUrl: './lista-tareas.page.html',
    styleUrls: ['./lista-tareas.page.scss'],
})
export class ListaTareasPage implements OnInit {
    ttoken: null;
    tareas: any = {};
    isLoading: boolean = false;

    constructor(public auth0: Auth0Service,
        public AServices: AlumnosService,
        public router: Router,
        private loadingController: LoadingController,
        private comunservice: ComunService,
        public toastController: ToastController) {

    }

    ngOnInit() {
        this.AServices.inicializar_token();
        this.getTareasAlumno();
    }

    async getTareasAlumno(event?) {
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 1000
        });
        await loading.present();
        this.isLoading = true;
        this.AServices.getTareasAlumno().subscribe((data: ResponseApi) => {
            setTimeout(() => {
                this.tareas = data.data.tareas;
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
        this.getTareasAlumno(event);
    }

}

