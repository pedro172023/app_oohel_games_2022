import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {NgModule, LOCALE_ID} from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import es from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PipesModule } from './pipes/pipes.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
registerLocaleData(es);


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            refreshingSpinner: 'dots',
            refreshingIcon: 'ios-arrow-down',
            backButtonIcon: 'ios-arrow-back',
            backButtonText: '',
            loadingSpinner:'dots'
        }),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        HttpClientModule,
        IonicStorageModule.forRoot({
            name: '__db_oohel_games',
        })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        CallNumber,
        {provide: LOCALE_ID, useValue: 'es-*'},
        FCM,
        LocalNotifications,
        InAppBrowser,
        BarcodeScanner
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
