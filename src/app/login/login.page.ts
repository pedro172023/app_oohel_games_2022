import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Auth0Service } from "../services/auth0.service";
import { LoadingController, MenuController, NavController, AlertController } from "@ionic/angular";
import { ResponseApi } from "../services/ResponseApi";
import { HomePage } from "../home/home.page";

import { Router } from "@angular/router";
import { __await } from "tslib";
import { NotificationsPushService } from "../services/notifications_push.service";
import { Platform } from '@ionic/angular';
import { ComunService } from '../services/comun.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    formulario_login: FormGroup;
    errorinput = false
    error_login: any = {
        message: '',
        visible: false
    };
    INTERVALO = 2000;
    first_clic_backButton;
    constructor(public auth0: Auth0Service,
        private router: Router,
        private menu: MenuController,
        public loadingController: LoadingController,
        private navCtrl: NavController,
        public alertController: AlertController,
        private notificationspushservice: NotificationsPushService,
        private comunservice: ComunService,
        private platform: Platform, ) {
        this.formulario_login = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            ttype: new FormControl(this.auth0.getTypeUser())
        });

        this.menu.enable(false);
        this.auth0.getToken().then(r => {
            if (r) {
                this._next_page_after_login();
            }
        });
        this.backButtonLogin();
    }

    backButtonLogin() {
        this.platform.backButton.subscribe(() => {
            var current_date = new Date(Date.now());
            var current_dateMilliseconds = current_date.getTime();
            if (this.router.url === '/login') {
                if (this.first_clic_backButton + this.INTERVALO > current_dateMilliseconds) {
                    navigator['app'].exitApp()
                } else {
                    this.comunservice.messageToast('Presiona de nuevo para salir de la app.', 2000)
                }
                this.first_clic_backButton = current_dateMilliseconds;
            }
        });
    }

    ngOnInit() {

    }

    async checkSesion() {
        this.errorinput = true
        const loading = await this.loadingController.create({
            message: 'Por favor espere..',
            duration: 2000
        });


        if (this.formulario_login.valid) {
            await loading.present();
            let { email, ttype } = this.formulario_login.value
            let form = new FormData()
            form.append('email', email);
            form.append('ttype', ttype);

            this.auth0.login(form).subscribe(async (d: ResponseApi) => {
                console.log(d);
                const { role, data } = await loading.onDidDismiss();
                try {
                    this.auth0.setUrlServer('');
                    this._guardarStorage('token', d.data.token);
                    this._guardarStorage('perfil', d.data.data);
                    /* Todo:
                     *   El usuario id en realidad es el íd del modelo donde se consulta la información
                     *  Por ejempo hr.employee.id or oohel.alumno.id
                     * */
                    this._guardarStorage('uid', d.data.data.uid); //
                    this._guardarStorage('id', d.data.data.id);
                    this._guardarStorage('MiniTutorialAaapre', true);
                    this._next_page_after_login();
                    this.notificationspushservice.getInfoTokenNotification(d.data.token);
                } catch (ee) {
                    console.log(ee);
                }
            }, error => {
                this.error_login.message = 'Accesos incorrectos';
                this.error_login.visible = true;
                setTimeout(() => this.error_login.visible = false, 3000);
            });
        }
    }

    _guardarStorage(key: string, value: any) {
        return this.auth0.setStorage(key, value);
    }

    _next_page_after_login() {
        this.menu.enable(true);
        this.navCtrl.setDirection('root');
        this.router.navigateByUrl('/home');
    }

    async volver_scannerqr() {
        this.navCtrl.setDirection('root');
        this.router.navigateByUrl('/scannerqr');
        this.auth0.removeStorage('base_url');
        this.auth0.removeStorage('url_logo_company');   
    }

    async reset_contrasenia() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Información',
            animated: true,
            inputs: [
                {
                    name: 'email_reset_pass',
                    type: 'email',
                    placeholder: 'Ingresa tu email',
                    value: this.formulario_login.getRawValue().email
                }],
            message: 'Por favor ingrese su dirección de correo electrónico. Recibiras un enlace para restablecer su contraseña por correo electrónico.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        var valid_email = this.validateEmail(data.email_reset_pass)
                        if (valid_email.isValid == true) {
                            this.auth0.resetPassword(data.email_reset_pass).subscribe((data: ResponseApi) => {
                                this.comunservice.messageToast('Se te ha enviado un correo para el restablecimiento de tu contraseña', 3000)
                                return true
                            }, error => {
                                this.comunservice.messageToast('Ha ocurrido un error, intentalo mas tarde', 3000)
                                console.log(error);
                            });
                        } else {
                            this.comunservice.messageToast(valid_email.message, 3000)
                            return false;
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    validateEmail(email) {
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            return {
                isValid: true,
                message: ''
            };
        } else {
            return {
                isValid: false,
                message: 'Email no valido'
            }
        }
    }
}
