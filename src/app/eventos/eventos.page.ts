import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { EventosCompanyService } from "../services/eventos_company.service";
import { ResponseApi } from "../services/ResponseApi";
import { Auth0Service } from "../services/auth0.service";
import { ComunService } from "../services/comun.service";
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  isLoading: boolean = false;
  eventos_company: any = {};
  constructor(
    public auth0: Auth0Service,
    private eventoscompanyservice: EventosCompanyService,
    private comunservice: ComunService,
    public loadingController: LoadingController) {
      this.comunservice.goToHomeByBackButtom('/eventos');
  }

  ngOnInit() {
    this.eventoscompanyservice.inicializar_token();
    this.cargarEventosCompany(null);
  }

  async cargarEventosCompany(event) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere..',
      duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.eventoscompanyservice.getEventosCompany().subscribe((data: ResponseApi) => {
      setTimeout(() => {
        this.eventos_company = data.data;
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }, 1000);
    }, error => {
      console.log(error);
      if (event) {
        event.target.complete();
      }
      this.isLoading = false;
      this.comunservice.tokenExpired(error);
      this.comunservice.messageToast('Ha ocurrido un error, intentalo mas tarde.',3000)
    });
  }

  verMas(website_url) {
    this.comunservice.goToBrowser(this.auth0.URL_SERVER + website_url)
  }
  
}
