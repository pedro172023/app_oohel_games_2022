import {Injectable} from '@angular/core';
import {BASECONFIG} from "./BASECONFIG";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {Auth0Service} from "./auth0.service";

@Injectable({
    providedIn: 'root'
})
export class EventosCompanyService extends BASECONFIG {
    ttoken = null
    constructor(public http: HttpClient, public store: Storage, public auth0: Auth0Service) {
        super();
        this.inicializar_token();
    }

    inicializar_token(){
        this.auth0.getToken().then(token => {
            this.ttoken = token;
        });
    }

    getEventosCompany() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}eventos_company`, form, this.httpOptions)
    }
}