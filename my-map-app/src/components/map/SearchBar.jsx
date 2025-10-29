import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onToggleFilters,
  showFilters,
}) {
  return (
    <div className="relative w-full">
      <div className="flex gap-3">
        {/* Campo de búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />

          {/* Input normal con Tailwind */}
          <input
            type="text"
            placeholder="Buscar organizaciones por nombre, ubicación o descripción..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-12 h-14 w-full text-base border border-gray-200 rounded-xl bg-white focus:border-[#00FF41] focus:ring-2 focus:ring-[#00FF41]/20 transition-all shadow-sm outline-none"
          />

          {/* Botón de limpiar búsqueda */}
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Botón de filtros */}
        <button
          onClick={onToggleFilters}
          className={`h-14 px-6 rounded-xl transition-all shadow-sm font-medium flex items-center justify-center ${
            showFilters
              ? "bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90"
              : "bg-white text-gray-700 border border-gray-200 hover:border-[#00FF41] hover:text-gray-900"
          }`}
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filtros
        </button>
      </div>
    </div>
  );
}
