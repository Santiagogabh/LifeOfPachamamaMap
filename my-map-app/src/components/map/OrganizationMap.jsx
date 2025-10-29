
import React, { useState, useEffect } from "react";
import { Organization } from "./Organization";

import { Map, List, Globe } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import MapView from "./MapView";
import OrganizationList from "./OrganizationList";

export default function OrganizationMap() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("map");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    filterOrganizations();
  }, [organizations, searchTerm, selectedRegions, selectedCategories]);

  const loadOrganizations = async () => {
    try {
      const data = await Organization.list();
      setOrganizations(data);
      setFilteredOrganizations(data);
    } catch (error) {
      console.error("Error loading organizations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrganizations = () => {
    let filtered = [...organizations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (org) =>
          org.name.toLowerCase().includes(term) ||
          org.city?.toLowerCase().includes(term) ||
          org.country?.toLowerCase().includes(term) ||
          org.purpose?.toLowerCase().includes(term)
      );
    }

    if (selectedRegions.length > 0) {
      filtered = filtered.filter((org) => selectedRegions.includes(org.region));
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((org) => selectedCategories.includes(org.category));
    }

    setFilteredOrganizations(filtered);
  };

  const handleRegionToggle = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedRegions([]);
    setSelectedCategories([]);
    setSearchTerm("");
  };

  const handleOrganizationClick = (org) => {
    setViewMode("map");
    setTimeout(() => {
      setFilteredOrganizations([org]);
    }, 100);
    setTimeout(() => {
      filterOrganizations();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#00FF41]/10 rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#00FF41]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                  Organizaciones Globales
                </h1>
                <p className="text-base text-gray-600 mt-1">
                  {filteredOrganizations.length} de {organizations.length} organizaciones
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("map")}
                className={`px-5 py-3 rounded-xl font-medium transition-all ${
                  viewMode === "map"
                    ? "bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90 shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#00FF41] hover:text-gray-900"
                }`}
              >
                <Map className="w-5 h-5 mr-2 inline" />
                Mapa
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`px-5 py-3 rounded-xl font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90 shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#00FF41] hover:text-gray-900"
                }`}
              >
                <List className="w-5 h-5 mr-2 inline" />
                Lista
              </button>
            </div>

          </div>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm("")}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />

        {showFilters && (
          <FilterPanel
            selectedRegions={selectedRegions}
            selectedCategories={selectedCategories}
            onRegionToggle={handleRegionToggle}
            onCategoryToggle={handleCategoryToggle}
            onClearAll={handleClearFilters}
          />
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-[600px] bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 border-3 border-gray-200 border-t-[#00FF41] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-gray-600">Cargando organizaciones...</p>
            </div>
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="flex items-center justify-center h-[600px] bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No se encontraron organizaciones
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90 rounded-lg font-medium px-6 py-3 shadow-sm"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        ) : viewMode === "map" ? (
          <div className="h-[700px]">
            <MapView organizations={filteredOrganizations} />
          </div>
        ) : (
          <OrganizationList
            organizations={filteredOrganizations}
            onOrganizationClick={handleOrganizationClick}
          />
        )}
      </div>
    </div>
  );
} 
/* --- IGNORE ---
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function OrganizationMap() {
  return (
    <div className="min-h-[600px] bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full h-[600px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}*/
