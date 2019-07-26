import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Credencial } from '../../model/clases';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credencial: Credencial = new Credencial('', '');
  ocupado = false;

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  login(fLogin: NgForm) {

    if ( fLogin.invalid ) { return; }

    if (this.ocupado) {
      return;
    }

    // const t = this.usuarioService.login(this.credencial).toPromise();
    // console.log(t);

    this.usuarioService.login(this.credencial).subscribe(
      res => {
        console.log(this.usuarioService.getToken());
        this.navCtrl.navigateRoot( '/main/tabs/productos', { animated: true } );
        this.ocupado = false;
      },
      (err: HttpErrorResponse ) => {
        if (err.status === 403) {
          this.loginErrorAlert('Usuario o contraseña incorrectos');
        } else {
          this.loginErrorAlert('Problemas de inicio de sesión');
        }
        this.ocupado = false;
      });
  }

  async loginErrorAlert(msg: string) {
    const alert = await this.alertController.create({
      subHeader: 'Inicio de sesión',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  salir() {
    this.usuarioService.logout();
  }
}
