# Guía: Reemplazar Imágenes por Videos

## 🎯 Pasos para Implementar Video

### 1. Preparar los Archivos de Video

#### Formatos Recomendados:
- **MP4** (H.264): Mejor compatibilidad
- **WebM**: Mejor compresión, soporte moderno
- **Poster frames**: JPG/PNG para imagen de preview

#### Optimización:
```bash
# Comprimir video con FFmpeg
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Crear poster frame
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 poster.jpg

# Crear WebM alternativo
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
```

### 2. Reemplazar Imagen Existente

#### Antes (con imagen):
```tsx
<img 
  src="/images/hero-image.jpg" 
  alt="Hero image"
  className="w-full h-auto"
/>
```

#### Después (con video):
```tsx
import { EditorialVideo } from './components/EditorialVideo';

<EditorialVideo
  src="/videos/hero-video.mp4"
  poster="/images/hero-poster.jpg"
  className="w-full"
  aspectRatio="16/9"
  autoPlay={true}
  loop={true}
  muted={true}
/>
```

### 3. Casos de Uso Específicos

#### A. Hero Section
```tsx
// Reemplazar imagen hero completa
import { HeroVideo } from './components/EditorialVideo';

<HeroVideo 
  src="/videos/hero-video.mp4"
  poster="/images/hero-poster.jpg"
>
  <div className="text-center text-white">
    <h1>Tu contenido sobre el video</h1>
  </div>
</HeroVideo>
```

#### B. About Page - Imagen del Estudio
```tsx
// En AboutPage.tsx, buscar la imagen y reemplazar:
<EditorialVideo
  src="/videos/studio-tour.mp4"
  poster="/images/studio-poster.jpg"
  controls={true}
  autoPlay={false}
  className="rounded-lg shadow-xl"
  aspectRatio="4/3"
/>
```

#### C. Background Video
```tsx
// Para video como fondo
import { BackgroundVideo } from './components/EditorialVideo';

<BackgroundVideo
  src="/videos/abstract-bg.mp4"
  opacity={0.3}
>
  <div>Tu contenido aquí</div>
</BackgroundVideo>
```

#### D. Galería de Trabajos
```tsx
// Reemplazar grid de imágenes por videos
{projects.map((project, index) => (
  <EditorialVideo
    key={index}
    src={project.videoSrc}
    poster={project.posterSrc}
    controls={true}
    autoPlay={false}
    className="rounded-lg hover:shadow-xl transition-shadow"
  />
))}
```

### 4. Estructura de Archivos Recomendada

```
public/
├── videos/
│   ├── hero-video.mp4
│   ├── hero-video.webm
│   ├── studio-tour.mp4
│   ├── project-1.mp4
│   └── background-loop.mp4
├── images/
│   ├── posters/
│   │   ├── hero-poster.jpg
│   │   ├── studio-poster.jpg
│   │   └── project-1-poster.jpg
│   └── fallbacks/
│       ├── hero-fallback.jpg
│       └── studio-fallback.jpg
```

### 5. Optimizaciones de Performance

#### Lazy Loading Automático:
- Los videos se cargan solo cuando entran en viewport
- Usa Intersection Observer (incluido en EditorialVideo)

#### Múltiples Formatos:
```tsx
<EditorialVideo
  src="/videos/hero-video.mp4"
  poster="/images/hero-poster.jpg"
  fallbackImage="/images/hero-fallback.jpg"
/>

// Con múltiples formatos (manual):
<video>
  <source src="/videos/hero.webm" type="video/webm" />
  <source src="/videos/hero.mp4" type="video/mp4" />
  Tu navegador no soporta video.
</video>
```

#### Responsive Videos:
```tsx
<EditorialVideo
  src="/videos/hero-mobile.mp4"  // En mobile
  // o usar el mismo video con different aspect ratios
  aspectRatio="9/16"  // Para mobile
  className="md:hidden"
/>

<EditorialVideo
  src="/videos/hero-desktop.mp4"  // En desktop
  aspectRatio="16/9"
  className="hidden md:block"
/>
```

### 6. Consideraciones de UX

#### Auto-play con Muted:
```tsx
// ✅ Permitido en navegadores
<EditorialVideo 
  autoPlay={true} 
  muted={true} 
  loop={true}
/>

// ❌ Bloqueado en navegadores
<EditorialVideo 
  autoPlay={true} 
  muted={false}  // No funciona sin interacción del usuario
/>
```

#### Controls Based on Context:
```tsx
// Hero videos: Sin controles, auto-play
<EditorialVideo controls={false} autoPlay={true} />

// Content videos: Con controles, manual play  
<EditorialVideo controls={true} autoPlay={false} />

// Background videos: Sin controles, loop infinito
<EditorialVideo controls={false} loop={true} />
```

### 7. Accessibility

```tsx
<EditorialVideo
  src="/videos/content.mp4"
  poster="/images/content-poster.jpg"
  // Agregar título descriptivo
  aria-label="Video mostrando el proceso de diseño editorial"
/>

// Para videos decorativos
<EditorialVideo
  src="/videos/background.mp4"
  aria-hidden="true"  // Hide from screen readers
/>
```

### 8. Fallbacks y Error Handling

```tsx
<EditorialVideo
  src="/videos/main-video.mp4"
  poster="/images/poster.jpg"
  fallbackImage="/images/fallback.jpg"  // Si video falla
  onError={(error) => {
    console.log('Video failed to load:', error);
    // Analytics tracking, etc.
  }}
/>
```

### 9. Implementación Step-by-Step

1. **Instalar dependencias** (ya tienes motion/react)
2. **Crear archivo EditorialVideo.tsx** ✅ 
3. **Preparar videos y posters**
4. **Identificar imagen a reemplazar**
5. **Importar componente**:
   ```tsx
   import { EditorialVideo } from './components/EditorialVideo';
   ```
6. **Reemplazar elemento `<img>` por `<EditorialVideo>`**
7. **Ajustar props según necesidades**
8. **Testear en diferentes dispositivos**

### 10. Testing Checklist

- [ ] Video carga correctamente
- [ ] Poster image aparece antes del video
- [ ] Auto-play funciona (solo si muted)
- [ ] Controles funcionan cuando están habilitados
- [ ] Responsive en mobile/desktop
- [ ] Performance: lazy loading funciona
- [ ] Fallback funciona si video falla
- [ ] Accessibility: labels apropiados

## 🚀 Ejemplo Práctico

Para reemplazar una imagen específica en tu proyecto:

1. **Localiza la imagen actual**
2. **Graba/obtén el video equivalente**
3. **Genera poster frame del video** 
4. **Reemplaza el código**:

```tsx
// ANTES
<img src="/images/studio.jpg" className="rounded-lg" />

// DESPUÉS  
<EditorialVideo
  src="/videos/studio.mp4"
  poster="/images/studio-poster.jpg"
  className="rounded-lg"
  controls={true}
  autoPlay={false}
  aspectRatio="16/9"
/>
```

¡Y listo! El video reemplazará la imagen manteniendo el mismo diseño y funcionalidad.