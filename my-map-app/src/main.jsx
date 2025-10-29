import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Estilos globales
import "./index.css";            // Tailwind
import "leaflet/dist/leaflet.css"; // Leaflet

// Modo normal (desarrollo o producción con Vite)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ OPCIONAL: función global para montar el mapa desde WordPress u otro HTML
window.mountOrganizationMap = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("No se encontró el contenedor con id:", containerId);
    return;
  }
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
// Ejemplo de uso en HTML externo:
// <div id="my-map-container"></div>
// <script src="path/to/your/bundled/main.jsx.js"></script>
// <script>
//   window.mountOrganizationMap('my-map-container');
// </script>