import 'leaflet/dist/leaflet.css';
import React from "react";
import OrganizationMap from "./components/map/OrganizationMap";

function App() {
  console.log("✅ App cargado con mapa");
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Mapa de Organizaciones
      </h1>
      <OrganizationMap />
    </div>
  );
}

export default App;
