// Preload script
window.addEventListener('DOMContentLoaded', () => {
  // Expose ipcRenderer to the window object
  const { ipcRenderer } = require('electron');
  window.ipcRenderer = ipcRenderer;
});