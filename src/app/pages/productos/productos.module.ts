import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosPage } from './productos.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ProductosPage },
      {path: 'producto/:id', loadChildren: '../productos/producto/producto.module#ProductoPageModule'}
    ])
  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}
