import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { ExternalLink } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function createCustomIcon() {
  return L.icon({
    iconUrl:
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e412f4f2948d5caa13cf74/2a56a4d4d_ChatGPTImageOct6202502_31_53PM.png",
    iconSize: [50, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -30],
  });
}

function MapUpdater({ organizations }) {
  const map = useMap();

  React.useEffect(() => {
    if (organizations.length > 0) {
      const bounds = L.latLngBounds(
        organizations.map((org) => [org.latitude, org.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [organizations, map]);

  return null;
}

export default function MapView({ organizations }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater organizations={organizations} />

        {organizations.map((org) => (
          <Marker
            key={org.id}
            position={[org.latitude, org.longitude]}
            icon={createCustomIcon()}
          >
            <Popup className="custom-popup">
              <div className="p-5 min-w-[300px] bg-white rounded-xl">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                  {org.name}
                </h3>

                {org.purpose && (
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {org.purpose}
                  </p>
                )}

                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <button className="w-full bg-[#00FF41] text-gray-900 hover:bg-[#00FF41]/90 rounded-lg font-medium shadow-sm flex items-center justify-center py-2 transition">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar Sitio Web
                    </button>
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>


    </div>
  );
}
