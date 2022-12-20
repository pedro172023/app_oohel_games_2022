import {Injectable} from '@angular/core';
import {BASECONFIG} from "./BASECONFIG";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {Auth0Service} from "./auth0.service";

@Injectable({
    providedIn: 'root'
})
export class AlumnosService extends BASECONFIG {
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

    getInfoAlumno() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumno/perfil`, form, this.httpOptions)
    }

    getTablero() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}jugador/tablero`, form, this.httpOptions)
    }


    getCalificacionesAlumno() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumno/calificaciones`, form, this.httpOptions)
    }

    getHorarioAlumno() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumno/horario`, form, this.httpOptions)
    }

    getTutoriasAlumno() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumno/tutorias`, form, this.httpOptions)
    }

    getTareasAlumno() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumno/tareas`, form, this.httpOptions)
    }

    downloadKardex() {
        let form = new FormData();
        form.append('token', this.ttoken);
        return this.http.post(`${this.auth0.BASEURL}alumno/download_kardex`, form, this.httpOptions)
    }
}