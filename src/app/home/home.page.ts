import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonSearchbar, IonSelect, IonSelectOption,
  IonList, IonItem, IonAvatar, IonLabel, IonBadge, IonButton, IonSpinner,
  ModalController, ToastController,
} from '@ionic/angular';
import { PhotoService } from '../services/photo';
import { Producto } from '../models/photo.model';
import { DetalleModalComponent } from '../components/detalle-modal/detalle-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent,
    IonGrid, 
    IonRow, 
    IonCol, 
    IonSearchbar, 
    IonSelect, 
    IonSelectOption,
    IonList, 
    IonItem, 
    IonAvatar, 
    IonLabel, 
    IonBadge, 
    IonButton, 
    IonSpinner,
  ],
})
export class HomePage implements OnInit {
  private photoService = inject(PhotoService);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);

  productosOriginales: Producto[] = []; 
  productosFiltrados: Producto[] = [];
  albumes: number[] = [];

  busqueda = '';
  albumSeleccionado: number | null = null;
  stockMinimo: number | null = null;

  cargando = true;
  error = '';

  ngOnInit() {
    this.photoService.getProductos().subscribe({
      next: (datos) => {
        this.productosOriginales = datos;
        this.productosFiltrados = [...datos];
        this.albumes = [...new Set(datos.map((p) => p.album))];
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los datos';
        this.cargando = false;
      },
    });
  }

  aplicarFiltros() {
  const texto = this.busqueda.toLowerCase().trim();
  this.productosFiltrados = this.productosOriginales.filter(
    (p) =>
      (this.albumSeleccionado === null || p.album === this.albumSeleccionado) &&
      (this.stockMinimo === null || p.stock >= this.stockMinimo) &&
      p.titulo.toLowerCase().includes(texto)
  );
}

  limpiarFiltros() {
    this.busqueda = '';
    this.albumSeleccionado = null;
    this.stockMinimo = null;
    this.aplicarFiltros();
  }

  onStockMinimo(ev: any) {
    const valor = ev.detail.value;
    this.stockMinimo = valor === '' || valor === null || valor === undefined ? null : Number(valor);
    this.aplicarFiltros();
}

  get stockTotal(): number {
    return this.productosFiltrados.reduce((acc, p) => acc + p.stock, 0);
  }

  colorStock(s: number): string {
    return s === 0 ? 'danger' : s < 10 ? 'warning' : 'success';
  }

  async abrirDetalle(p: Producto) {
    const modal = await this.modalCtrl.create({
      component: DetalleModalComponent,
      componentProps: { producto: p },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      p.stock += data.cantidad; 
      this.mostrarToast(`Stock actualizado: +${data.cantidad} unidades`);
    }
  }

  async mostrarToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }
}