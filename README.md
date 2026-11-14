# Tienda

Catálogo web de una tienda de belleza: maquillaje, cuidado de la piel, cabello, uñas, depilación, cejas y pestañas.
El cliente arma su carrito en la página y, al confirmar, el pedido se envía como mensaje de WhatsApp al número de la tienda.

- **Sin backend:** es una página estática hecha con React.
- **Catálogo en CSV:** los productos se cargan desde un archivo CSV y sus fotos desde una carpeta de imágenes.
- **Pensada para celular:** la mayoría de los clientes llegan desde WhatsApp.

---

## Índice

1. [Diseño de la página](#diseño-de-la-página)
2. [Modelo de datos del producto](#modelo-de-datos-del-producto)
3. [Categorías y subcategorías](#categorías-y-subcategorías)
4. [Estados del producto](#estados-del-producto)
5. [Mensaje de WhatsApp](#mensaje-de-whatsapp)
6. [Tecnologías](#tecnologías)
7. [Estructura del proyecto](#estructura-del-proyecto)

---

## Diseño de la página

Distribución de la pantalla principal, de arriba hacia abajo:

```text
┌─────────────────────────────┐
│  MARCA                  🛒  │  ← nombre de la marca y carrito a la derecha
├─────────────────────────────┤
│  🔍 Buscar...               │  ← barra de búsqueda
├─────────────────────────────┤
│                             │
│         NOVEDADES           │  ← bloque destacado
│                             │
├─────────────────────────────┤
│ [Maquillaje] [Piel] [Cab ▸  │  ← categorías, se deslizan hacia los lados
├──────────────┬──────────────┤
│   [ foto ]   │   [ foto ]   │
│   Nombre     │   Nombre     │  ← grilla de 2 columnas
│   $ Precio   │   $ Precio   │
│  [Agregar]   │  [Agregar]   │
├──────────────┴──────────────┤
│  Total: $ 0   [Pedir por WhatsApp] │  ← barra fija, siempre visible
└─────────────────────────────┘
```

- Al tocar una categoría, los productos de esa categoría aparecen debajo.
- Cada tarjeta de producto muestra la foto y, debajo, el nombre, el precio y el botón para agregar al carrito.
- La barra inferior con el total y el botón **Pedir por WhatsApp** queda fija en la pantalla.

---

## Modelo de datos del producto

Cada producto es una fila del CSV ([src/data/productos.csv](src/data/productos.csv)).

| Campo | Obligatorio | Múltiple | Se muestra | Descripción |
| --- | :---: | :---: | :---: | --- |
| **ID** | Sí | No | No | Identificador único. Sirve para encontrar la foto: `src/data/img/{ID}.jpg`. |
| **Nombre** | Sí | No | Sí | Breve. Se muestra en el catálogo junto a la foto. |
| **Descripción** | No | No | Sí | Especificaciones del producto. Aparece en letra pequeña debajo del nombre. |
| **Clase** | Sí | Sí | — | Sección de la tienda donde aparece el producto. Ver [categorías](#categorías-y-subcategorías). |
| **Clase específica** | No | Sí | — | Subcategoría dentro de la clase. Se usa para filtrar. |
| **Precio** | Sí | No | Sí | Entero positivo, sin decimales, en pesos cubanos. |
| **Estado** | No | No | Sí | Disponibilidad del producto. Ver [estados](#estados-del-producto). |
| **Favoritos** | No | No | Sí | `true` o `false`. Si está vacío se toma como `false`. `true` indica que es uno de los favoritos de los usuarios y se marca como destacado en la página de detalle del producto. |

### Campos con varios valores

Los valores múltiples se separan con `|`, sin espacios alrededor. No se usa la coma porque es el separador de columnas del CSV.

```csv
ID,Nombre,Descripción,Clase,Clase específica,Precio,Estado,Favoritos
XD_10,Base con FPS,,Maquillaje|Piel,Bases|Protectores solares,3500,Pocas unidades,true
```

- **Clase:** un producto puede pertenecer a varias secciones.
  _Ejemplo:_ una base de maquillaje con protector solar aparece en **Maquillaje** y en **Piel**.
- **Clase específica:** un producto puede tener varias subcategorías.
  _Ejemplo:_ un lápiz que sirve para delinear ojos y cejas aparece al filtrar por **Ojos** y por **Cejas**.
- Una clase específica puede quedar vacía. No todo producto tiene que pertenecer a una subcategoría.

---

## Categorías y subcategorías

| Clase | Clases específicas |
| --- | --- |
| **Maquillaje** | Bases · Ojos · Cejas · Labios |
| **Piel** | Serums · Mascarillas · Cremas · Limpiadores · Tónicos · Protectores solares · Dispositivos |
| **Cabello** | Adornos · Aceites · Champús + Acondicionador · Cepillos · Rizos · Dispositivos |
| **Uñas** | Colores · Bases · Brillos · Lámparas |
| **Depilación** | Ceras · Ollas · Post depilación |
| **Cejas** | Pigmento · Laminado |
| **Pestañas** | Pestañas · Pegas · Dispositivos |

---

## Estados del producto

| Estado | Comportamiento |
| --- | --- |
| **Agotado** | La imagen se ve opaca y aparece un cartel grande de "Agotado" en una esquina, sin tapar la foto. El botón de compra queda desactivado. |
| **Más de 10 unidades** | Se muestra en letra muy pequeña, en una esquina de la página de detalle del producto. |
| **Pocas unidades** | Igual que el anterior. |
| _(vacío)_ | No se muestra nada. |

---

## Mensaje de WhatsApp

Al pulsar **Pedir por WhatsApp**, se abre un chat con el número de la tienda y este mensaje ya escrito:

- Una línea por producto con `ID Nombre Precio x Cantidad`, mostrando los valores sin multiplicar.
- Al final, el total calculado.

Ejemplo:

```text
XD_01 Papel de depilacion $1500 x 2
XD_05 Cera fria $1600 x 1

Total: $4600
```

---

## Tecnologías

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) como herramienta de desarrollo y build
- [React Router](https://reactrouter.com) para la navegación entre páginas

---

## Estructura del proyecto

```text
src/
  data/
    productos.csv           ← catálogo de productos
    img/                    ← fotos de los productos ({ID}.jpg)
    products.ts             ← catálogo convertido a TypeScript
  types.ts                  ← tipos Product y CartItem
  context/CartContext.tsx   ← estado global del carrito
  components/               ← ProductCard, CartDrawer, Header, CategoryChips...
  pages/                    ← Home, Category, ProductDetail, Cart
  utils/whatsapp.ts         ← arma el mensaje de WhatsApp
  App.tsx                   ← rutas
```

---

## Estado del proyecto

🚧 En desarrollo.
