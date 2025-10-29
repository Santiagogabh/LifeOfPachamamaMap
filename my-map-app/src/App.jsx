
//import React from "react";
//import OrganizationMap from "./Components/map/OrganizationMap";


//export default function App() {
//  return <OrganizationMap />;
//}
import React from "react";
import OrganizationMap from "./components/map/OrganizationMap";

function App() {
  console.log("✅ App cargado con mapa"); // Verifica en consola si aparece este mensaje
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
