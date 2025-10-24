# 🐾 Happy Pet Page - Clínica Veterinaria

> **Una landing page moderna y profesional para clínicas veterinarias**

Landing page promocional completa para la clínica veterinaria **Paws & Care**, desarrollada con las mejores prácticas de desarrollo frontend. El proyecto combina React 18 + TypeScript con un sistema de diseño robusto basado en Tailwind CSS y shadcn/ui, ofreciendo una experiencia de usuario excepcional tanto en desktop como en dispositivos móviles.

## 🌟 Vista previa

- **Landing Principal**: Página de inicio con secciones hero, sobre nosotros, servicios y contacto
- **Blog**: Sistema completo de blog con listado de artículos y páginas individuales
- **Diseño Responsive**: Totalmente adaptado para todos los dispositivos

## 📌 Características principales

- Layout responsive con secciones de héroe, servicios, blog, contacto y pie de página.
- Componentes de interfaz accesibles montados sobre las primitivas de Radix UI.
- Estilos consistentes mediante Tailwind CSS, utilidades personalizadas y animaciones.
- Gestión de efectos globales con toast, tooltips y proveedor de React Query para datos remotos futuros.
- Plantilla de blog preparada para contenidos dinámicos (mock data) con SEO básico vía `react-helmet`.

## 🧰 Tecnologías utilizadas

- [Vite 5](https://vitejs.dev/) como bundler y servidor de desarrollo.
- [React 18](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/).
- [React Router DOM 6](https://reactrouter.com/) para el ruteo de páginas.
- [@tanstack/react-query](https://tanstack.com/query/latest) ya configurado para consumo de APIs.
- [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate` para estilos y micro-animaciones.
- [shadcn/ui](https://ui.shadcn.com/) y [Radix UI](https://www.radix-ui.com/) como base de los componentes UI.
- [Lucide Icons](https://lucide.dev/) para iconografía y utilidades como `clsx`, `tailwind-merge`, `sonner`.
- `react-helmet` para metadatos y SEO en páginas individuales.

> Nota: El proyecto también incluye dependencias como React Hook Form y Zod, listas para validaciones avanzadas en formularios futuros.

## 🗂️ Estructura del proyecto

```
happy-pet-page-main/
├─ public/                 # Assets estáticos servidos tal cual
├─ src/
│  ├─ assets/              # Imágenes usadas en la UI
│  ├─ components/          # Componentes atómicos y de sección
│  │  ├─ blog/             # Secciones reutilizables del artículo del blog
│  │  └─ ui/               # Librería shadcn/ui generada
│  ├─ hooks/               # Hooks reutilizables (toast, detección mobile)
│  ├─ lib/                 # Utilidades como `cn`
│  ├─ pages/               # Páginas enrutadas con React Router
│  ├─ App.tsx              # Definición de rutas y proveedores globales
│  └─ main.tsx             # Punto de entrada que monta la app
├─ index.html              # Documento base de Vite
├─ package.json            # Metadatos y scripts de proyecto
├─ vite.config.ts          # Configuración de Vite + alias `@`
└─ tailwind.config.ts      # Configuración de Tailwind y design tokens
```

## 🧭 Ruteo y navegación

El proyecto utiliza **React Router DOM v6** para la navegación entre páginas:

### Rutas principales

- **`/`** → `Index.tsx` - Landing page principal con todas las secciones
- **`/blog`** → `BlogListPage.tsx` - Listado completo de artículos del blog
- **`/blog/:slug`** → `BlogPage.tsx` - Página individual de cada artículo
- **`*`** → `NotFound.tsx` - Página de error 404 con enlace de retorno

### Navegación interna

Las secciones de la landing (Hero, About, Services, Blog, Contact) se navegan mediante:

- **Smooth scrolling** desde el header y footer
- **Anclajes automáticos** con `scrollIntoView`
- **Navegación fluida** sin recargas de página

### SEO y metadatos

- `BlogPage` utiliza **react-helmet** para metadatos dinámicos por artículo
- Cada página tiene su propio título y descripción optimizada
- URLs amigables para SEO (`/blog/nombre-del-articulo`)

## 🧩 Arquitectura de componentes

### Componentes de layout principal

- **`Header`** - Navegación principal con menú responsive y smooth scroll
- **`Footer`** - Pie de página con enlaces de navegación y redes sociales
- **`Hero`** - Sección hero con call-to-action principal
- **`About`** - Sección "Sobre nosotros" con información de la clínica
- **`Services`** - Catálogo de servicios veterinarios ofrecidos
- **`Blog`** - Preview del blog con últimos artículos destacados
- **`Contact`** - Formulario de contacto y información de ubicación

### Sistema de blog (`components/blog/`)

Componentes especializados para renderizado dinámico de contenido:

- **`BlogSection`** - Container principal que maneja diferentes tipos de sección
- **`TextSection`** - Renderiza párrafos y texto enriquecido
- **`TextWithImageSection`** - Combina texto con imágenes alineadas
- **`MediaSection`** - Maneja imágenes, videos y contenido multimedia
- **`AdSection`** - Secciones promocionales dentro de artículos
- **`BlogCard`** - Tarjetas de preview para listados de artículos
- **`BlogCardSkeleton`** - Estados de carga para mejor UX

### Biblioteca UI (`components/ui/`)

Más de 30 componentes base construidos sobre **Radix UI**:

- Componentes de entrada: `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`
- Navegación: `Button`, `NavigationMenu`, `Breadcrumb`, `Pagination`
- Feedback: `Toast`, `Alert`, `Progress`, `Skeleton`
- Overlays: `Dialog`, `Popover`, `Tooltip`, `DropdownMenu`
- Layout: `Card`, `Separator`, `Tabs`, `Accordion`, `Table`

### Hooks personalizados (`hooks/`)

- **`use-toast`** - Sistema de notificaciones toast personalizable
- **`use-mobile`** - Hook para detección responsive de dispositivos móviles

## 🚀 Instalación y configuración

### Requisitos previos

- **Node.js** v18 o superior ([Descargar aquí](https://nodejs.org/))
- Un gestor de paquetes: **pnpm** (recomendado), npm, yarn o bun

### Clonación del repositorio

```powershell
git clone https://github.com/santiagomillan/happy-pet-page.git
cd happy-pet-page
```

### Instalación de dependencias

El proyecto incluye archivos de lock para diferentes gestores de paquetes:

```powershell
# Opción 1: pnpm (recomendado - más rápido)
pnpm install

# Opción 2: npm
npm install

# Opción 3: bun (ultra rápido)
bun install

# Opción 4: yarn
yarn install
```

### Modo desarrollo

```powershell
# Con pnpm
pnpm dev

# Con npm
npm run dev

# Con bun
bun run dev
```

🚀 **La aplicación estará disponible en:** http://localhost:5173

### Build para producción

```powershell
# Generar build optimizado
pnpm run build

# Vista previa del build
pnpm run preview
```

Los archivos optimizados se generan en la carpeta `dist/` listos para desplegar.

## 🧪 Scripts disponibles

- `pnpm run dev`: servidor de desarrollo con hot reload.
- `pnpm run build`: compila el proyecto para producción.
- `pnpm run build:dev`: build en modo desarrollo (útil para pruebas de pipelines).
- `pnpm run preview`: sirve la carpeta `dist` tras un build.
- `pnpm run lint`: analiza el código con ESLint + TypeScript.

## 🤝 Contribuir al proyecto

### Estándares de código

- **ESLint** configurado con reglas estrictas para TypeScript y React
- **Prettier** para formateo consistente de código
- **Conventional Commits** para mensajes de commit claros
- **TypeScript strict mode** habilitado

### Cómo contribuir

1. **Fork** el repositorio
2. Crea una **rama feature**: `git checkout -b feature/nueva-funcionalidad`
3. **Instala** dependencias: `pnpm install`
4. **Desarrolla** y prueba tus cambios: `pnpm run dev`
5. **Verifica** el código: `pnpm run lint`
6. **Haz commit** con mensaje descriptivo: `git commit -m "feat: agregar nueva funcionalidad"`
7. **Push** a tu rama: `git push origin feature/nueva-funcionalidad`
8. Abre un **Pull Request** con descripción detallada

### Estructura de commits

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Documentación
- `style:` - Cambios de estilo/formato
- `refactor:` - Refactorización de código
- `test:` - Agregar/modificar tests

## 💡 Próximas mejoras

- [ ] Integración con CMS headless (Sanity)
- [ ] Manejo errores de la info. crear info quemada en caso de error con el cms
- [ ] query única, Si falla, fetch individual por sección, Error Boundaries, Fallback data
- [ ] Sistema de citas online
- [ ] Panel de administración
- [ ] Tests unitarios y e2e

---

⭐ **¡Si te gusta el proyecto, no olvides darle una estrella en GitHub!**
