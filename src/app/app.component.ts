import {Component} from '@angular/core';
import {MenuController, Platform, NavController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Auth0Service} from "./services/auth0.service";
import {Router} from "@angular/router";
import {FCM} from '@ionic-native/fcm/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {NotificationsPushService} from "./services/notifications_push.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Notificaciones',
            url: '/notificacion',
            icon: 'notifications'
        }
    ];
    url_logo_company = ""
    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                public auth0: Auth0Service,
                public router: Router,
                public menu: MenuController,
                private fcm: FCM,
                private navCtrl: NavController,
                private notificationspushservice: NotificationsPushService,
                private localNotifications: LocalNotifications
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.auth0.getStorage('url_logo_company').then(value =>{
            this.url_logo_company = value
        })
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString("#512da8");
            this.splashScreen.hide();
            this.auth0.getToken().then(token_user => {
                if (token_user != null) {
                    this.notificationspushservice.getInfoTokenNotification(token_user);
                }
            });
        }).catch(error => {
            //console.log(error);
        });

        this.fcm.onTokenRefresh().subscribe((token: string) => {
            //console.log("actualizacion del token  : " + token);
        });

        this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
                //console.log("esta en segundo plano" + JSON.stringify(data));
            } else {
                //console.log("esta en primer plano" + JSON.stringify(data));
                if (this.platform.is('ios')) {
                    this.localNotifications.schedule({
                      id: Math.floor((Math.random() * 100) * 1),
                      title: data.aps.alert.title,
                      icon: data.aps.alert.icon,
                      text: data.aps.alert.body,
                    });
                  } else {
                    this.localNotifications.schedule({
                      id: Math.floor((Math.random() * 100) * 1),
                      title: data.title,
                      icon: data.icon,
                      text: data.body,
                    });
                  }
            }
        }, error => {
            //console.log("error : " + error);
        });
    }

    async cerrar_session() {
        await this.notificationspushservice.destroy_token_notification()
        this.auth0.logout().then(t => {
            this.menu.enable(false)
            this.navCtrl.setDirection('root');
            this.router.navigateByUrl('/login');
        });
    }
}
