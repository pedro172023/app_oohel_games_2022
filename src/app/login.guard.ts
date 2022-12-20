import {Injectable} from '@angular/core';
import { NavController} from '@ionic/angular';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Auth0Service} from "./services/auth0.service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router,
                private navCtrl: NavController,
                private authGuard: Auth0Service,) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authGuard.isAuthenticate().then(result => {
            console.log(result);
            if (!result) {
                this.navCtrl.setDirection('root');
                this.router.navigate(['login']);
            }
        });

        return true;
    }
}