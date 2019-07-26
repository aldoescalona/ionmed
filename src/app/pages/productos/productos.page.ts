import { Component, EventEmitter } from '@angular/core';
import { Producto } from '../../model/interfaces';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: 'productos.page.html',
  styleUrls: ['productos.page.scss']
})
export class ProductosPage {

  productos: Producto[] = [];
  cargando: boolean = false;


  subs: Subscription = null;

  constructor(private productoService: ProductoService,
              public usuarioService: UsuarioService,
              private navCtrl: NavController,
              public alertController: AlertController,
              public loadingController: LoadingController) {

  }

  ionViewWillEnter() {
    this.cargaProductos();
  }

  ionViewDidLeave() {
    // console.log('ionViewDidLeave');
  }

  onPageWillLeave() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  async cargaProductos() {
    this.cargando = true;

    const loading = await this.loadingController.create({
      message: 'Espere',
    });

    loading.present();

    this.subs = this.productoService.productos().subscribe((data: Producto[]) => {
      this.productos = data;
      console.log(data);
      this.cargando = false;
      if (loading) {
        loading.dismiss();
      }
    });
  }

  recargarProductos(event) {
    this.productoService.productos().subscribe((data: Producto[]) => {
      this.usuarioService.pullProds = false;
      this.productos = data;
      console.log(data);
      event.target.complete();
    });
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


  seleccionaProducto(producto: Producto) {
    console.log(producto);
    this.navCtrl.navigateForward('/main/tabs/productos/producto/' + producto.id);
  }

}
