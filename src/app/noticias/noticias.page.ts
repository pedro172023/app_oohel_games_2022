import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from "@ionic/angular";
import { BlogService } from "../services/blog.service";
import { ResponseApi } from "../services/ResponseApi";
import { Auth0Service } from "../services/auth0.service";
import { ComunService } from "../services/comun.service";
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  blog: any = {};
  isLoading: boolean = false;
  constructor(
    public auth0: Auth0Service,
    public comunservice: ComunService,
    private blogservice: BlogService,
    public loadingController: LoadingController) {
      this.comunservice.goToHomeByBackButtom('/noticias');
  }

  ngOnInit() {
    this.blogservice.inicializar_token();
    this.cargarBlog(null);
  }

  async cargarBlog(event) {
    const loading = await this.loadingController.create({
      message: 'Por favor espere..',
      duration: 1000
    });
    await loading.present();
    this.isLoading = true;
    this.blogservice.getBlog().subscribe((data: ResponseApi) => {
      setTimeout(() => {
        this.blog = data.data;
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
