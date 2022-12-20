import {Injectable} from '@angular/core';
import {BASECONFIG} from "./BASECONFIG";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {Auth0Service} from "./auth0.service";

@Injectable({
    providedIn: 'root'
})
export class AvisosService extends BASECONFIG {
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

    getAvisos() {
        let form = new FormData();
        form.append('token', this.ttoken);
        form.append('ttype', this.auth0.getTypeUser())
        return this.http.post(`${this.auth0.BASEURL}avisos_notificaciones`, form, this.httpOptions)
    }
}