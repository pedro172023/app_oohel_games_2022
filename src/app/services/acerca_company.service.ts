import {Injectable} from '@angular/core';
import {BASECONFIG} from "./BASECONFIG";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {Auth0Service} from "./auth0.service";

@Injectable({
    providedIn: 'root'
})
export class AcercaCompanyService extends BASECONFIG {
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

    getAcercaCompany() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}acerca_company`, form, this.httpOptions)
    }

    getAcercaCompanyLocal() {
        return this.auth0.getStorage('acerca_company');
    }

    setAcercaCompanyLocal(data) {
        this.auth0.setStorage('acerca_company', data)
    }
}