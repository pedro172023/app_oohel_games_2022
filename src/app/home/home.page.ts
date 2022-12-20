import { Component } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ComunService } from '../services/comun.service';
import { Router } from '@angular/router';
import { Auth0Service } from "../services/auth0.service";
import { MenuController } from "@ionic/angular";
import { AlumnosService } from "../services/alumnos.service";
import { BASECONFIG } from '../services/BASECONFIG';
import { ResponseApi } from '../services/ResponseApi';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  ttoken: null;
  tablero: any;
  premios: any;
  INTERVALO = 2000;
  isLoading: boolean = false;
  first_clic_backButton;
  constructor(public auth0: Auth0Service,
    public AServices: AlumnosService,
    private router: Router,
    private menu: MenuController,
    private platform: Platform,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private comunservice: ComunService) {
    this.backButtonHome();
    this.AServices.inicializar_token();
    this.auth0.getToken().then(token => {
      this.ttoken = token;
    });
    this.getTableroJugadores();
  }

  async getTableroJugadores(event?) {
    const loading = await this.loadingController.create({
        message: 'Por favor espere..',
        duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.AServices.getTablero().subscribe((data: ResponseApi) => {
        setTimeout(() => {
            this.tablero = data.data.jugadores;
            this.premios = data.data.premios;
            console.log(this.tablero)
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
  this.getTableroJugadores(event);
}

convertBase64(data){
  var imageb64:string = String(data)
  return 'data:image/jpeg;base64,'+imageb64
}

  load_page_calificaciones() {
    this.menu.enable(true);
    this.router.navigateByUrl('/calificaciones');
  }

  load_page_horarios() {
    this.menu.enable(true);
    this.router.navigateByUrl('/horarios');
  }

  load_page_tutorias() {
    this.menu.enable(true);
    this.router.navigateByUrl('/tutorias');
  }
  load_page_tareas() {
    this.menu.enable(true);
    this.router.navigateByUrl('/tareas');
  }

  download_kardex() {
    this.comunservice.goToBrowser(this.auth0.URL_SERVER +this.auth0.VERSION_API + 'alumno/download_kardex?token='+this.ttoken, '_system')
  }

  backButtonHome() {
    this.platform.backButton.subscribe(() => {
      var current_date = new Date(Date.now());
      var current_dateMilliseconds = current_date.getTime();
      if (this.router.url === '/home') {
        if (this.first_clic_backButton + this.INTERVALO > current_dateMilliseconds) {
          navigator['app'].exitApp()
        } else {
          this.comunservice.messageToast('Presiona de nuevo para salir de la app.', 2000)
        }
        this.first_clic_backButton = current_dateMilliseconds;
      }
    });
  }
}