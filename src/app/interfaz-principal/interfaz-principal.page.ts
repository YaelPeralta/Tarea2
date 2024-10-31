import { Component } from '@angular/core';

interface User {
  username: string;
  storeName?: string;
  storeImageUrl?: string;
}
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-interfaz-principal',
  templateUrl: './interfaz-principal.page.html',
  styleUrls: ['./interfaz-principal.page.scss'],
})
export class InterfazPrincipalPage {
  nombreTienda = 'Mi Tienda';
  urlTienda = 'https://example.com/default-image.png';

  constructor(private router: Router, private alertController: AlertController) {
    this.loadStoreData();
  }

  loadStoreData() {
    const users: User[] = JSON.parse(localStorage.getItem('datosTienda') || '[]');
    const username = localStorage.getItem('loggedInUser');

    if (username) {
      const foundUser = users.find(user => user.username === username);
      if (foundUser) {
        this.nombreTienda = foundUser.storeName || this.nombreTienda;
        this.urlTienda = foundUser.storeImageUrl || this.urlTienda;
      }
    }
  }

  async logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('keepLoggedIn');
    const alert = await this.alertController.create({
      header: 'Sesión Cerrada',
      message: 'Has cerrado sesión exitosamente.',
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(['/auth']);
  }
}
