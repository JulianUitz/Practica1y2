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
cd python -m http.server 8000
```

Opción B — Node (http-server, si tienes npm):

```powershell
cd  npx http-server -p 8000
```

Abrir en el navegador: http://localhost:8000

