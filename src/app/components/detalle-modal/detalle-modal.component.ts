import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton,
  IonContent, 
  IonBadge, 
  IonInput, 
  ModalController,
  AlertController,
} from '@ionic/angular';
import { Producto } from '../../models/photo.model';

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss'],
  standalone: true,
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons,
    IonButton, IonContent, IonBadge, IonInput,
  ],
})
export class DetalleModalComponent {
  @Input() producto!: Producto;
  cantidad: number | null = null;

  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async reabastecer() {
  if (!this.cantidad || this.cantidad <= 0) return;

  const alert = await this.alertCtrl.create({
    header: 'Confirmar reabastecimiento',
    message: `¿Agregar ${this.cantidad} unidades al stock?`,
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Confirmar',
        handler: () => this.modalCtrl.dismiss({ cantidad: this.cantidad }, 'confirm'),
      },
    ],
  });
  await alert.present();
}

  colorStock(s: number): string {
    return s === 0 ? 'danger' : s < 10 ? 'warning' : 'success';
  }
}