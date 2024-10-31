import { Component } from '@angular/core';

// Interfaz Cliente
interface Cliente {
  nombre: string;
  domicilio: string;
  telefono: string;
  correo: string;
  url: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss'],
})
export class ClientesPage {
  valorNombre = "";
  valorDomicilio = "";
  valorTelefono = "";
  valorCorreo = "";
  urlCliente = "";
  editindex: number | null = null;

  clientes: Cliente[] = [];

  constructor() {
    let clientesLocal = localStorage.getItem("clientes");
    if (clientesLocal) {
      this.clientes = JSON.parse(clientesLocal);
    }
  }

  Borrar(i: number) {
    if (confirm("¿Deseas eliminar este cliente?")) {
      this.clientes.splice(i, 1);
      localStorage.setItem("clientes", JSON.stringify(this.clientes));
    }
  }

  Editar(cliente: Cliente, i: number) {
    this.editindex = i;
    this.valorNombre = cliente.nombre;
    this.valorDomicilio = cliente.domicilio;
    this.valorTelefono = cliente.telefono;
    this.valorCorreo = cliente.correo;
    this.urlCliente = cliente.url;
  }

  Cancelar() {
    this.limpiarFormulario();
  }

  Agregar() {
    if (this.valorNombre && this.valorDomicilio && this.valorTelefono && this.valorCorreo && this.urlCliente) {
      if (this.editindex === null) {
        this.clientes.push({
          nombre: this.valorNombre,
          domicilio: this.valorDomicilio,
          telefono: this.valorTelefono,
          correo: this.valorCorreo,
          url: this.urlCliente,
        });
      } else {
        this.clientes[this.editindex] = {
          nombre: this.valorNombre,
          domicilio: this.valorDomicilio,
          telefono: this.valorTelefono,
          correo: this.valorCorreo,
          url: this.urlCliente,
        };
      }

      localStorage.setItem("clientes", JSON.stringify(this.clientes));
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.valorNombre = "";
    this.valorDomicilio = "";
    this.valorTelefono = "";
    this.valorCorreo = "";
    this.urlCliente = "";
    this.editindex = null;
  }
}
