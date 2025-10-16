// Registro del service worker y manejo del prompt de instalación
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => console.log('Service Worker registrado:', reg))
      .catch((err) => console.error('Error al registrar Service Worker:', err));
  });
}

// Manejo seguro del prompt de instalación
let deferredPrompt = null;
function createInstallButton() {
  if (document.getElementById('installBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'installBtn';
  btn.className = 'install-btn';
  btn.textContent = 'Instalar app';
  // Colocar en footer o body de forma no invasiva
  const footer = document.querySelector('footer') || document.body;
  footer.appendChild(btn);
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('Resultado de la instalación:', choice.outcome);
    deferredPrompt = null;
    btn.remove();
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Crear el botón cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInstallButton);
  } else {
    createInstallButton();
  }
});

window.addEventListener('appinstalled', () => {
  console.log('La app fue instalada');
});