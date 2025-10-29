import React from "react";
import { ExternalLink, MapPin } from "lucide-react";

export default function OrganizationList({ organizations, onOrganizationClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <div
          key={org.id}
          className="group border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden p-6"
        >
          <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-tight group-hover:text-[#00FF41] transition-colors">
            {org.name}
          </h3>

          {org.purpose && (
            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
              {org.purpose}
            </p>
          )}

          {(org.city || org.country) && (
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>
                {org.city}
                {org.city && org.country ? ", " : ""}
                {org.country}
              </span>
            </div>
          )}

          <div className="flex gap-2">
            {org.website && (
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1"
              >
                <button className="w-full bg-white text-gray-700 border border-[#00FF41] hover:bg-[#00FF41]/5 rounded-lg font-medium transition-colors flex items-center justify-center py-2">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visitar sitio
                </button>
              </a>
            )}

            <button
              onClick={() => onOrganizationClick(org)}
              className="flex-1 bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90 rounded-lg font-medium shadow-sm flex items-center justify-center py-2"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver en mapa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
