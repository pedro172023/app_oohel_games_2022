import { Injectable } from '@angular/core';
import { Platform, ToastController, NavController, AlertController, MenuController} from "@ionic/angular";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from "@angular/router";
import { Auth0Service } from './auth0.service';
@Injectable({
    providedIn: 'root'
})
export class ComunService {
    constructor(
        private iab: InAppBrowser,
        private callNumber: CallNumber,
        private toastController: ToastController,
        private router: Router,
        private navCtrl: NavController,
        private alertController: AlertController,
        public auth0: Auth0Service,
        public menu: MenuController,
        private platform: Platform) {
    }

    async goToBrowser(url, target="_blanck") {
        const options: InAppBrowserOptions =
        {
            location: 'yes',//Or 'no'
            hidden: 'no', //Or  'yes'
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',//Android only ,shows browser zoom controls
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no', //Android only
            closebuttoncaption: 'Close', //iOS only
            disallowoverscroll: 'no', //iOS only
            toolbar: 'yes', //iOS only
            enableViewportScale: 'no', //iOS only
            allowInlineMediaPlayback: 'no',//iOS only
            presentationstyle: 'pagesheet',//iOS only
            fullscreen: 'yes',//Windows only
        }
        this.iab.create(url, target, options);
    }

    async call_number(number) {
        if (number != false) {
            this.callNumber.callNumber(number, true)
                .then(res => console.log('Launched dialer!', res))
                .catch(err => console.log('Error launching dialer', err));
        } else {
            const toast = await this.toastController.create({
                message: 'El numero no es valido',
                duration: 2000
            });
            toast.present();
        }
    }

    async messageToast(message = '', interval = 2000) {
        const toast = await this.toastController.create({
            message: message,
            duration: interval,
        });
        toast.present();
    }

    goToHomeByBackButtom(url_procedencia) {
        if (this.router.url === url_procedencia) {
            this.platform.backButton.subscribe(() => {
                this.navCtrl.setDirection('root');
                this.router.navigateByUrl('/home');
            });
        }
    }

    async tokenExpired(error){
        if(error.status == 403){
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Aviso',
                animated: true,
                message: 'Su token de seguridad ha vencido, es necesario iniciar sesión nuevamente.',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                    }, {
                        text: 'Aceptar',
                        handler: (data) => {
                            this.auth0.logout().then(t => {
                                this.menu.enable(false)
                                this.navCtrl.setDirection('root');
                                this.router.navigateByUrl('/login');
                            });
                        }
                    }
                ]
            });
            await alert.present();
        }
    }
}