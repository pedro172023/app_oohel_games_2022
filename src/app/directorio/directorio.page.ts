import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { IonItem, IonItemSliding, IonItemOptions } from '@ionic/angular';
import { DirectorioService } from "../services/directorio.service";
import { ResponseApi } from "../services/ResponseApi";
import { ComunService } from "../services/comun.service";

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {
  isLoading: boolean = false;
  searchQuery: string = '';
  textoSearch = '';
  directorio: any = {};
  activeItemSliding: IonItemSliding = null;

  constructor(
    private directorioservice: DirectorioService, 
    public loadingController: LoadingController,
    public comunservice: ComunService) {
      this.comunservice.goToHomeByBackButtom('/directorio');
  }

  ngOnInit() {
    this.directorioservice.inicializar_token();
    this.directorioservice.getDirectorioLocal().then((result) =>{
        if (result == null){
          this.cargarDirectorio();
        }else{
          this.directorio = result
        }
    })
  }

  async cargarDirectorio(event?) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere..',
      duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.directorioservice.getDirectorio().subscribe((data: ResponseApi) => {
      setTimeout(() => {
        this.directorioservice.setDirectorioLocal(data.data)
        this.directorio = data.data;
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

  llamar(number) {
    this.comunservice.call_number(number)
  }
  
  getItems(event){
    this.textoSearch = event.detail.value;
  }
}
