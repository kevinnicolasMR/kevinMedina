# Kevin Medina Dev — Sitio estático SEO-first

Web estática con **Astro + MDX** para un canal de YouTube de programación. Prioriza rendimiento, SEO técnico y un flujo simple para publicar artículos.

## Requisitos

- Node.js >= 22.12
- npm

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview
```

## Estructura del proyecto

```
src/
  config/site.ts          # Datos globales del sitio
  content/articles/       # Artículos en Markdown/MDX
  components/             # Componentes reutilizables
  layouts/                # BaseLayout, ArticleLayout, PillarLayout
  lib/                    # Utilidades (artículos, schema, URLs)
  pages/                  # Rutas estáticas
public/
  robots.txt
```

## Editar datos del sitio

Actualiza `src/config/site.ts`:

- `name`, `title`, `description`
- `url` (dominio de producción)
- `author` y `youtube` (nombre y URLs del canal)
- `navigation` (menú principal)

También sincroniza la URL en:

- `astro.config.mjs` → propiedad `site`
- `public/robots.txt` → URL del sitemap

## Añadir un nuevo artículo

1. Crea un archivo en `src/content/articles/`, por ejemplo `mi-nuevo-articulo.mdx`.
2. Añade el frontmatter obligatorio:

```yaml
---
title: 'Título del artículo'
description: 'Descripción para SEO y previews sociales'
pillar: sql
slug: mi-nuevo-articulo
publishedDate: 2026-05-29
keywords:
  - keyword principal
  - keyword secundaria
youtubeVideoId: ID_DEL_VIDEO   # opcional
relatedSlugs: []               # slugs de artículos relacionados
draft: false
---
```

3. Escribe el contenido en Markdown/MDX.
4. Para usar componentes MDX, impórtalos al inicio del archivo:

```mdx
import Callout from '../../components/Callout.astro';

<Callout type="tip" title="Consejo">
  Texto del callout.
</Callout>
```

5. El artículo se publicará automáticamente en:

```
/{pillar}/{slug}
```

Ejemplo: `/sql/mi-nuevo-articulo`

> Los artículos con `pillar: sql` se generan desde `src/pages/sql/[slug].astro`.

## Cambiar el video de YouTube

En el frontmatter del artículo:

```yaml
youtubeVideoId: abc123XYZ
```

Efectos:

- Muestra el embed del video (`YouTubeEmbed`)
- El CTA de YouTube apunta al video
- Se genera schema `VideoObject` en JSON-LD

Si omites `youtubeVideoId`, el CTA enlaza al canal definido en `site.ts`.

## Insertar un video de YouTube en un artículo

Importa el componente reutilizable al inicio del `.mdx`:

```mdx
import YouTubeEmbed from '../../components/YouTubeEmbed.astro';

<YouTubeEmbed
  videoId="TU_VIDEO_ID"
  title="Título del video"
  caption="Descripción breve opcional"
/>
```

Mantén el mismo `videoId` en el frontmatter (`youtubeVideoId`) para que se generen el schema `VideoObject` y la miniatura en la home.

## SEO incluido

- `<title>`, `description`, `canonical`
- Open Graph y Twitter Card
- `robots.txt`
- Sitemap automático (`@astrojs/sitemap`)
- JSON-LD: `WebSite`, `BreadcrumbList`, `Article`, `VideoObject` (si hay video)

## Desplegar la web

Astro genera HTML estático en `dist/`. Puedes desplegar en cualquier hosting estático.

### Pasos generales

1. Configura `site.url` en `src/config/site.ts` y `astro.config.mjs`.
2. Ejecuta `npm run build`.
3. Sube la carpeta `dist/` a tu hosting.

### Opciones recomendadas

**Vercel**

```bash
npm i -g vercel
vercel
```

**Netlify**

- Build command: `npm run build`
- Publish directory: `dist`

**Cloudflare Pages**

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

**GitHub Pages / servidor propio**

Sube el contenido de `dist/` al directorio público del servidor o al branch `gh-pages`.

## Checklist antes de publicar

- [ ] Dominio real en `site.ts` y `astro.config.mjs`
- [ ] URLs del canal de YouTube verificadas
- [ ] Enlaces oficiales de Microsoft en artículos técnicos
- [ ] Requisitos y versiones confirmados con documentación actual
- [ ] `youtubeVideoId` actualizado por artículo
- [ ] Imagen OG en `public/og-default.png` (opcional pero recomendado)

## Licencia

Contenido del sitio: todos los derechos reservados.
