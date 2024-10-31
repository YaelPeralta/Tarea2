import { Component } from '@angular/core';

interface Producto {
  nombre: string;
  descripcion: string;
  cantidad: number;
  precioCosto: number;
  precioVenta: number;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  valorNombre = "";
  valorDescripcion = "";
  valorCantidad: number | null = null;
  valorPrecioCosto: number | null = null;
  valorPrecioVenta: number | null = null;
  urlProducto = "";
  editindex: number | null = null;

  productos: Producto[] = [];

  constructor() {
    let productosLocal = localStorage.getItem("productos");
    if (productosLocal) {
      this.productos = JSON.parse(productosLocal);
    }
  }

Borrar(i: number) {
  if (confirm("¿Deseas eliminar este producto?")) {
    this.productos.splice(i, 1);
    localStorage.setItem("productos", JSON.stringify(this.productos));
  }
}

Editar(producto: Producto, i: number) {
  this.editindex = i;
  this.valorNombre = producto.nombre;
  this.valorDescripcion = producto.descripcion;
  this.valorCantidad = producto.cantidad;
  this.valorPrecioCosto = producto.precioCosto;
  this.valorPrecioVenta = producto.precioVenta;
  this.urlProducto = producto.url;
}

Cancelar() {
  this.limpiarFormulario();
}

Agregar() {
  if (this.valorNombre && this.valorDescripcion && this.valorCantidad !== null && this.valorPrecioCosto !== null && this.valorPrecioVenta !== null && this.urlProducto) {
    if (this.editindex === null) {
      this.productos.push({
        nombre: this.valorNombre,
        descripcion: this.valorDescripcion,
        cantidad: this.valorCantidad,
        precioCosto: this.valorPrecioCosto,
        precioVenta: this.valorPrecioVenta,
        url: this.urlProducto
      });
    } else {
      this.productos[this.editindex] = {
        nombre: this.valorNombre,
        descripcion: this.valorDescripcion,
        cantidad: this.valorCantidad,
        precioCosto: this.valorPrecioCosto,
        precioVenta: this.valorPrecioVenta,
        url: this.urlProducto
      };
    }

    localStorage.setItem("productos", JSON.stringify(this.productos));

    this.limpiarFormulario();
  }
}

limpiarFormulario() {
  this.valorNombre = "";
  this.valorDescripcion = "";
  this.valorCantidad = null;
  this.valorPrecioCosto = null;
  this.valorPrecioVenta = null; 
  this.urlProducto = "";
  this.editindex = null;
}
}
