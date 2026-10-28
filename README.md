# Inventario de Fotos - Ionic + Angular

Prototipo de aplicación móvil híbrida para la clase de Dispositivos Móviles.
Consume datos de la API pública JSONPlaceholder y gestiona un inventario local.

## Características

- Dashboard responsivo con `ion-header`, `ion-toolbar` e `ion-card` con métrica calculada (stock total).
- Servicio HTTP (`@Injectable` + `HttpClient`) que transforma la respuesta de la API a un modelo TypeScript.
- Filtros interactivos con `ion-searchbar`, `ion-select` e `ion-input` enlazados con `ngModel`.
- Listado con `ion-list`, `ion-avatar` e `ion-badge` con color según el nivel de stock.
- Lógica de negocio con `filter()`, `map()`, `reduce()` y `sort()`, conservando los datos originales.
- Modal de detalle con imagen en alta resolución, stock actual y formulario de reabastecimiento.
- Confirmación con `ion-alert` y notificación con `ion-toast` (2,5 s).

## Tecnologías

- Ionic 9
- Angular (standalone components)
- TypeScript
- API: https://jsonplaceholder.typicode.com/photos

## Instalación y ejecución

```bash
npm install
ionic serve
```

La app se abre en `http://localhost:8100`.

## Estructura principal

src/app/
├── components/detalle-modal/   # Modal de detalle y reabastecimiento
├── home/                       # Página principal (dashboard, filtros, lista)
├── models/photo.model.ts       # Interfaces PhotoApi y Producto
└── services/photo.service.ts   # Servicio HTTP


## Reglas de negocio

- El stock no viene en la API, se genera localmente a partir del `id` de cada foto.
- Colores del badge: rojo (0), amarillo (menos de 10), verde (10 o más).
- Los filtros por álbum y palabra clave se combinan y siempre parten de los datos originales.

## Autor
Miguel Angel Dussan Silva
