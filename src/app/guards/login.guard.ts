import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {

    const promesa = new Promise<boolean>((resolve, reject) => {
      this.usuarioService.healthCkeck().then(res => {
        if ( res ) {
        resolve(true);
        } else {
          this.navCtrl.navigateRoot( '/login');
          reject(false);
        }
      });
    });

    return promesa;
  }

}

