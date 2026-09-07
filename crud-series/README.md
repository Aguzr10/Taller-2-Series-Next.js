# Taller 2: CRUD de Series (Next.js)

Proyecto desarrollado para el Taller 2 de la clase de Desarrollo Web. Es un CRUD completo de series de televisión construido con Next.js (App Router), TypeScript y Tailwind CSS, guardando los datos en el `localStorage` del navegador.

---

## Cómo ejecutar el proyecto

1. Entrar a la carpeta del proyecto:
```bash
cd crud-series
```

2. Instalar las dependencias:
```bash
npm install
```

3. Correr el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

---

## Funcionalidades principales

- **Catálogo de series**: Muestra las series registradas con póster, temporadas, género, plataforma y rating.
- **Búsqueda en tiempo real**: Filtra por nombre mientras se escribe, usando debounce de 300 ms para no saturar con re-renders.
- **Filtros por categoría**: Botones para filtrar rápido por género.
- **Detalle de la serie**: Vista individual (`/series/[id]`) con la portada en grande, detalles técnicos y la sinopsis completa.
- **Crear y editar**: Formularios controlados con validación en tiempo real (campos requeridos, temporadas mínimas, rating de 1 a 10, validación de url y preview de imagen).
- **Eliminar con confirmación**: Modal que pide confirmación antes de borrar una serie para evitar accidentes.
- **Favoritos**: Botón para marcar/desmarcar series favoritas y verlas agrupadas en la sección `/favoritos` con su contador en la barra superior.
- **Persistencia**: Todos los cambios (creadas, editadas, eliminadas y favoritos) se quedan guardados en el `localStorage`.
- **Loading states**: Skeletons animados mientras cargan los datos.

---

## Series iniciales

Si el `localStorage` está vacío, la app precarga 6 series por defecto:

1. **The Flash** (Grant Gustin) — The CW / Netflix
2. **Haikyuu!!** — Crunchyroll / Netflix
3. **BoJack Horseman** — Netflix
4. **House M.D.** — Prime Video / Max
5. **The Mentalist** — Max / Prime Video
6. **Jujutsu Kaisen** — Crunchyroll / Netflix

---

## Decisiones tomadas en el proyecto

- **Context API (`SeriesContext`)**: Se usó un contexto global para no tener que pasar las series y favoritos de componente en componente (evitar prop drilling). Así la navbar, las tarjetas y los formularios se conectan directo a los datos.
- **Persistencia y SSR**: Como `localStorage` solo corre en el navegador, la carga se hace dentro de un `useEffect` para no romper el renderizado del servidor de Next.js.
- **Formularios controlados**: Todo el estado del formulario se maneja con `useState`, validando cada campo antes de enviar y limpiando los datos al crear.
- **Rutas dinámicas**: Se usó la estructura de carpetas de App Router (`/series/[id]`, `/series/[id]/edit`, `/series/new`, `/favoritos`).

---

## Estructura de carpetas

```
crud-series/
├── app/
│   ├── layout.tsx          # Layout con navbar, fuentes y provider
│   ├── page.tsx            # Catálogo principal con buscador
│   ├── series/
│   │   ├── new/page.tsx    # Crear serie
│   │   └── [id]/
│   │       ├── page.tsx    # Detalle de la serie
│   │       └── edit/page.tsx # Editar serie
│   ├── favoritos/page.tsx  # Vista de favoritos
│   └── not-found.tsx       # Página 404
├── components/             # Componentes reutilizables (tarjeta, navbar, modal, form, etc.)
├── context/                # Contexto global (SeriesContext)
├── data/                   # Datos de las 6 series iniciales
└── types/                  # Tipos e interfaces de TypeScript
```
