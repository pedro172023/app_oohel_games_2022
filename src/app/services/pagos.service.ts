import {Injectable} from '@angular/core';
import {BASECONFIG} from "./BASECONFIG";
import {Auth0Service} from "./auth0.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PagosService extends BASECONFIG {
    ttoken = null

    constructor(private auth0: Auth0Service, private  http: HttpClient) {
        super();
        this.inicializar_token();
    }

    inicializar_token(){
        this.auth0.getToken().then(token => {
            this.ttoken = token;
        });
    }

    /*Recibos pendientes de pago*/
    getRecibosPendientes() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumnos/pagos`, form, this.httpOptions)
    }

}
