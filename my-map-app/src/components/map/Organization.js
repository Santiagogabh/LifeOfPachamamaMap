// src/entities/Organization.js

// Datos de ejemplo (basados en tu schema)
const organizationsData = [
  {
    name: "Fundación Pacha Verde",
    purpose: "Reforestación urbana y educación ambiental",
    website: "https://pachaverde.org",
    latitude: 4.711,
    longitude: -74.0721,
    city: "Bogotá",
    country: "Colombia",
    region: "América del Sur",
    category: "ONG",
    logo_url: "https://example.com/logo1.png",
  },
  {
    name: "Eco Mente Global",
    purpose: "Educación ambiental y economía circular",
    website: "https://ecomente.org",
    latitude: -0.2295,
    longitude: -78.5243,
    city: "Quito",
    country: "Ecuador",
    region: "América del Sur",
    category: "Fundación",
    logo_url: "https://example.com/logo2.png",
  },
];

// Exporta un objeto con la función list()
export const Organization = {
  async list() {
    // Simulamos una llamada a API
    return Promise.resolve(organizationsData);
  },
};
