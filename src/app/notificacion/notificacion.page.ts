import { Component, OnInit } from '@angular/core';
import { NotificationsPushService } from '../services/notifications_push.service';
import { LoadingController } from '@ionic/angular';
import { ResponseApi } from "../services/ResponseApi";
import { ComunService } from "../services/comun.service";
import { Auth0Service } from "../services/auth0.service";

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  isLoading: boolean = false;
  notificaciones: any = {};
  textoSearch = '';
  constructor(
    private noficacionesservice: NotificationsPushService,
    public comunservice: ComunService,
    public auth0: Auth0Service,
    private loadingController: LoadingController) { 
      this.comunservice.goToHomeByBackButtom('/notificaciones');
    }

  ngOnInit() {
    this.cargarNotificaciones(null);
  }

  getItems(event){
    this.textoSearch = event.detail.value;
  }

  async cargarNotificaciones(event) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere..',
      duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.auth0.getToken().then(token => {
      this.noficacionesservice.getNotificationsUser(token).subscribe((data: ResponseApi) => {
        setTimeout(() => {
          this.notificaciones = data.data;
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }, 1000);
      }, error => {
        if (event) {
          event.target.complete();
        }
        this.isLoading = false;
        this.comunservice.tokenExpired(error);
        this.comunservice.messageToast('Ha ocurrido un error, intentalo mas tarde.',3000)
      });
    });
    
  }
}
