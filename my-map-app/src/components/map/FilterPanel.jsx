import React from "react";
import { X } from "lucide-react";

const REGIONS = [
  "América del Norte",
  "América del Sur",
  "Europa",
  "Asia",
  "África",
  "Oceanía",
  "Medio Oriente",
];

const CATEGORIES = [
  "ONG",
  "Empresa Social",
  "Institución Educativa",
  "Organización Gubernamental",
  "Fundación",
  "Red Comunitaria",
  "Instituto de Investigación",
];

export default function FilterPanel({
  selectedRegions,
  selectedCategories,
  onRegionToggle,
  onCategoryToggle,
  onClearAll,
}) {
  const hasFilters =
    selectedRegions.length > 0 || selectedCategories.length > 0;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Filtrar Resultados
        </h3>

        {hasFilters && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-lg px-3 py-2 transition"
          >
            <X className="w-4 h-4" />
            Limpiar
          </button>
        )}
      </div>

      {/* Region Filters */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Región</h4>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => onRegionToggle(region)}
                className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  selectedRegions.includes(region)
                    ? "bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Categoría</h4>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Info */}
      {hasFilters && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm font-medium text-gray-700">
            {selectedRegions.length + selectedCategories.length}{" "}
            {selectedRegions.length + selectedCategories.length === 1
              ? "filtro activo"
              : "filtros activos"}
          </p>
        </div>
      )}
    </div>
  );
}
