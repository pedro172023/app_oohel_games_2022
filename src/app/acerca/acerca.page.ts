import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { AcercaCompanyService } from '../services/acerca_company.service';
import { ResponseApi } from "../services/ResponseApi";
import { ComunService } from "../services/comun.service";
import { Auth0Service}  from "../services/auth0.service";

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {
  acerca_company: any = {};
  isLoading: boolean = false;
  constructor(
    private acercacompanyservice: AcercaCompanyService, 
    public loadingController: LoadingController, 
    public auth0: Auth0Service,
    public comunservice: ComunService){
      this.comunservice.goToHomeByBackButtom('/acerca');
    }

  ngOnInit() {
    this.acercacompanyservice.inicializar_token();
    this.acercacompanyservice.getAcercaCompanyLocal().then((result) =>{
      if (result == null){
        this.cargarAcercaCompany();
      }else{
        this.acerca_company = result
      }
  })
  }

  async cargarAcercaCompany(event?) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere..',
      duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.acercacompanyservice.getAcercaCompany().subscribe((data: ResponseApi) => {
      setTimeout(() => {
        this.acercacompanyservice.setAcercaCompanyLocal(data.data)
        this.acerca_company = data.data;
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
  }

  toSocial(account_social) {
    if (account_social != false) {
      this.ver_url_navegador(account_social)
    } else {
      this.comunservice.messageToast('No hay enlace activo.',2000)
    }
  }

  call_phone(number) {
    this.comunservice.call_number(number);
  }

  ver_url_navegador(url) {
    this.comunservice.goToBrowser(url);
  }
}
