import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface User {
  id: number;
  username: string;
  password: string;
  storeName: string;
  storeImageUrl: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  username = '';
  password = '';
  storeName = '';
  storeImageUrl = '';

  usernameLogin = ''; 
  passwordLogin = '';
  keepLoggedIn = false;

  isRegisterModalOpen = false;

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.checkAutoLogin();
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
  }

  async register() {
    if (this.username && this.password && this.storeName && this.storeImageUrl) {
      const newUser: User = {
        id: Date.now(),
        username: this.username,
        password: this.password,
        storeName: this.storeName,
        storeImageUrl: this.storeImageUrl,
      };

      const existingUsers: User[] = JSON.parse(localStorage.getItem('datosTienda') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('datosTienda', JSON.stringify(existingUsers));

      this.clearForm();
      await this.presentAlert('Éxito', 'Usuario registrado exitosamente');

      this.closeRegisterModal();
    } else {
      await this.presentAlert('Error', 'Por favor, completa todos los campos');
    }
  }

  clearForm() {
    this.username = '';
    this.password = '';
    this.storeName = '';
    this.storeImageUrl = '';
  }

  checkAutoLogin() {
    const keepLoggedIn = localStorage.getItem('keepLoggedIn');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (keepLoggedIn && loggedInUser) {
      this.router.navigate(['/interfaz-principal']);
    }
  }

  async login() {
    const users: User[] = JSON.parse(localStorage.getItem('datosTienda') || '[]');
    const foundUser = users.find(user => user.username === this.usernameLogin && user.password === this.passwordLogin);

    if (foundUser) {
      await this.presentAlert('Éxito', 'Inicio de sesión exitoso');
      localStorage.setItem('loggedInUser', foundUser.username);

      if (this.keepLoggedIn) {
        localStorage.setItem('keepLoggedIn', 'true');
      } else {
        localStorage.removeItem('keepLoggedIn');
      }

      this.router.navigate(['/interfaz-principal']);
    } else {
      await this.presentAlert('Error', 'Usuario o contraseña incorrectos');
    }
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
