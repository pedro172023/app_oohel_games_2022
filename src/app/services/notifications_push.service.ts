import { Injectable } from '@angular/core';
import { BASECONFIG } from "./BASECONFIG";
import { HttpClient } from "@angular/common/http";
import { Auth0Service } from "./auth0.service";
import { FCM } from '@ionic-native/fcm/ngx';
@Injectable({
    providedIn: 'root'
})
export class NotificationsPushService extends BASECONFIG {
    ttoken = null
    constructor(public http: HttpClient, public auth0: Auth0Service, private fcm: FCM) {
        super();
        this.auth0.getToken().then(token => {
            this.ttoken = token;
        });
    }

    getInfoTokenNotification(ttoken) {
        this.fcm.getToken().then(async (token_notification: string) => {
            var token_notification_storage = await this.auth0.getStorage('token_notification')
            if (token_notification_storage != token_notification) {
                let form = new FormData();
                form.append('res_model', this.auth0.getTypeUser());
                form.append('token_notification', token_notification);
                form.append('token', ttoken);
                this.http.post(`${this.auth0.BASEURL}notification_push`, form, this.httpOptions).subscribe((data) => {
                    this.auth0.setStorage('token_notification', token_notification);
                }, error => {
                    console.log(error);
                });
            }
        });
    }

    getNotificationsUser(token) {
        let form = new FormData();
        form.append('ttype', this.auth0.getTypeUser());
        form.append('token', token);
        return this.http.post(`${this.auth0.BASEURL}notifications_user`, form, this.httpOptions)
    }

    async destroy_token_notification() {
        var token_notification_storage = await this.auth0.getStorage('token_notification')
        let form = new FormData();
        form.append('res_model', this.auth0.getTypeUser());
        form.append('token_notification', token_notification_storage);
        form.append('token', this.ttoken);
        this.http.post(`${this.auth0.BASEURL}notification_push_destroy`, form, this.httpOptions).subscribe((data) => {
        }, error => {
            
        });
    }
}