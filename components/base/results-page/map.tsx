import React from "react";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { cn } from "@/lib/utils";

const markerIcon = L.icon({ iconUrl: "/images/marker-icon.png" });
const markerIcon2x = L.icon({ iconUrl: "/images/marker-icon-2x.png" });
const markerShadow = L.icon({ iconUrl: "/images/marker-shadow.png" });

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapProps {
  locations?: { name: string; coordinates: [number, number] }[];
  className?: string;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export function Map({ locations, className }: MapProps) {
  const center =
    locations && locations[0].coordinates
      ? (locations[0].coordinates as L.LatLngExpression)
      : [51, -0.09];
  const zoom = locations && locations[0].coordinates ? 14 : 2;

  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={zoom}
      scrollWheelZoom={false}
      className={cn("h-[800px] rounded-lg", className)}
    >
      <TileLayer url={url} attribution={attribution} />
      {locations?.map((location, i) => (
        <Marker
          key={i}
          position={location.coordinates as L.LatLngExpression}
          icon={markerIcon}
        >
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
