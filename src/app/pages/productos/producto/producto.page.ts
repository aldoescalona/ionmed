import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Movimiento, Producto } from '../../../model/interfaces';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  id = null;
  movimientos: Movimiento[] = [];
  producto: Producto = null;
  cargando: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productoService: ProductoService,
              public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargaMovimientos(this.id);
    this.cargaProducto(this.id);
  }

  cargaProducto(productoId: number) {
    this.productoService.producto(productoId).subscribe((data: Producto) => {
      this.producto = data;
      console.log(data);
      this.cargando = false;
    });
  }

  cargaMovimientos(productoId: number) {
    this.cargando = true;
    this.productoService.movimientos(productoId).subscribe((data: Movimiento[]) => {
      this.movimientos = data;
      console.log(data);
      this.cargando = false;
    });
  }

  recargarMovimientos(event) {
    this.productoService.movimientos(this.id).subscribe((data: Movimiento[]) => {
      this.usuarioService.pullMovs = false;
      this.movimientos = data;
      console.log(data);
      event.target.complete();
    });
  }
}
