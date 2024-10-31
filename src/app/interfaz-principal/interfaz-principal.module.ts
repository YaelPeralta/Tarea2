import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterfazPrincipalPageRoutingModule } from './interfaz-principal-routing.module';

import { InterfazPrincipalPage } from './interfaz-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfazPrincipalPageRoutingModule
  ],
  declarations: [InterfazPrincipalPage]
})
export class InterfazPrincipalPageModule {}
