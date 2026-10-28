import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PhotoApi, Producto } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/photos';

  getProductos(): Observable<Producto[]> {
    return this.http.get<PhotoApi[]>(this.url).pipe(
      map((lista) =>
        lista.slice(0, 250).map((p) => ({
          id: p.id,
          album: p.albumId,
          titulo: p.title,
          miniatura: `https://picsum.photos/seed/${p.id}/150`,
          imagen: `https://picsum.photos/seed/${p.id}/800`,
          stock: (p.id * 7) % 30,
        }))
      )
    );
  }
}