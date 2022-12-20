import { Component, OnInit } from '@angular/core';
import { AlumnosService } from "../services/alumnos.service";
import { Auth0Service } from "../services/auth0.service";
import { ResponseApi } from "../services/ResponseApi";
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { ComunService } from '../services/comun.service';


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    ttoken: null;
    alumnos: any;
    isLoading: boolean = false;

    constructor(public auth0: Auth0Service,
        public AServices: AlumnosService,
        public router: Router,
        private comunservice: ComunService,
        private loadingController: LoadingController,
        public toastController: ToastController) {

    }

    ngOnInit() {
        this.AServices.inicializar_token();
        this.getInfoAlumno();
    }

    async getInfoAlumno(event?) {
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 1000
        });
        await loading.present();
        this.isLoading = true;
        this.AServices.getInfoAlumno().subscribe((data: ResponseApi) => {
            setTimeout(() => {
                this.alumnos = data.data.alumno;
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
        this.getInfoAlumno(event);
    }

    convertBase64(data){
        var imageb64:string = String(data)
        return 'data:image/jpeg;base64,'+imageb64
    }

}
