import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { AvisosService } from "../services/avisos.service";
import { ResponseApi } from "../services/ResponseApi";
import { ComunService } from '../services/comun.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {
  avisos: any = {};
  textoSearch = '';
  isLoading: boolean = false;
  constructor(
    private avisosservice: AvisosService,
    private loadingController: LoadingController,
    private comunservice: ComunService) {
    this.comunservice.goToHomeByBackButtom('/avisos');
  }

  ngOnInit() {
    this.avisosservice.inicializar_token();
    this.cargarAvisos(null);
  }

  getItems(event) {
    this.textoSearch = event.detail.value;
  }

  async cargarAvisos(event) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere..',
      duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.avisosservice.getAvisos().subscribe((data: ResponseApi) => {
      setTimeout(() => {
        this.avisos = data.data;
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
}
