import {Injectable} from '@angular/core';
import {BASECONFIG} from "./BASECONFIG";
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';

const TTUSER = 'player'

@Injectable({
    providedIn: 'root'
})
export class Auth0Service extends BASECONFIG {

    constructor(public http: HttpClient, public store: Storage, private iab: InAppBrowser,) {
        super();
        this.getBaseUrl().then(baseurl => {
            this.setUrlServer(baseurl)
        });
    }

    getTypeUser() {
        return TTUSER
    }

    login(form: FormData) {
        return this.http.post(`${this.BASEURL}login/`, form, this.httpOptions);
    }

    resetPassword(email){
        let form = new FormData();
        form.append('email', email);
        return this.http.post(`${this.BASEURL}reset_password`, form, this.httpOptions);
    }

    async isAuthenticate() {

        try {
            let token = await this.getToken();
            if (token != null) {
                return true;
            } else
                return false;

        } catch (ee) {
            console.log(ee);
            return false
        }

    }

    logout() {
        var base_url = this.getStorage('base_url')
        var url_logo_company = this.getStorage('url_logo_company')
        this.removeAllStorage();
        this.setStorage('url_logo_company', url_logo_company)
        return this.setStorage('base_url', base_url)
    }

    async getToken() {
        return await this.getStorage('token');
    }

    async setStorage(key: string, value: any) {
        return await this.store.set(key, value);
    }

    async getStorage(key: string) {
        return await this.store.get(key);
    }

    async getUid() {
        return await this.getStorage('uid');
    }

    async getBaseUrl() {
        return await this.getStorage('base_url');
    }
    
    async removeStorage(key: string){
        return await this.store.remove(key);
    }
    async removeAllStorage(){
        return await this.store.clear();
    }

}
