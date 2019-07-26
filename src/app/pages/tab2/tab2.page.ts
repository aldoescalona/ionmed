import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../model/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  usuario: Usuario = null;
  cargandoUsuario: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              public alertController: AlertController) { }


  ionViewWillEnter() {
    if (this.usuario === null) {
      this.cargandoUsuario = true;
      this.usuarioService.usuarioFirmado().subscribe((usr: Usuario) => {
        this.usuario = usr;
        this.cargandoUsuario = false;
      }, (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.usuarioService.logout();
        }
      });

    }

  }


  salir() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: 'Desea cerrar sesión de <strong>Medalfa</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Cerrar',
          handler: () => {
            console.log('Confirm Okay');
            this.usuarioService.logout();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

}
