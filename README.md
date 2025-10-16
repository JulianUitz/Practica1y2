Mi PWA - Práctica 1 y 2

Archivos creados:
- index.html: página principal y referencia al manifiesto
- styles.css: estilos básicos
- app.js: registra el service worker y maneja el prompt de instalación
- manifest.json: manifiesto de la PWA
- service-worker.js: service worker con cache básico
- icons/: iconos SVG de ejemplo
- icons/: iconos SVG y PNG (se generaron `icon-192x192.png` y `icon-512x512.png`)

Cómo servir en localhost (PowerShell):

Opción A — Python 3 (si está instalado):

```powershell
cd "c:\Users\julia\OneDrive\Documents\Practica1y2"; python -m http.server 8000
```

Opción B — Node (http-server, si tienes npm):

```powershell
cd "c:\Users\julia\OneDrive\Documents\Practica1y2"; npx http-server -p 8000
```

Abrir en el navegador: http://localhost:8000

Cómo verificar:
1. Abre DevTools (F12) → pestaña "Application" (Aplicación).
2. En el panel "Manifest" verifica que se cargue y que los íconos, theme_color y display sean correctos.
3. En el panel "Service Workers" verifica que el service worker esté registrado y activo.
4. Simula dispositivo móvil (Ctrl+Shift+M) y busca la opción "Add to home screen" o usa el botón de instalación que aparece en la página.

Notas:
- Los service workers requieren HTTPS o localhost.
 - He añadido PNGs generados (`icons/icon-192x192.png`, `icons/icon-512x512.png`) y el manifiesto está configurado para usarlos.
- Si quieres, puedo añadir un pequeño test o una página de estado que muestre si el SW está activo.
