"use client";

import React from "react";

import L from "leaflet";
import { Marker, useMap } from "react-leaflet";

import { useHealthcareProviderLocation } from "@/hooks/use-healthcare-provider-location";

const markerIcon = L.icon({ iconUrl: "/images/marker-icon.png" });

interface MarkerProps {
  center: L.LatLngExpression;
  address?: string;
  state?: string;
}

export function MapMarker({ center }: MarkerProps) {
  const healthcareProviderLocation = useHealthcareProviderLocation();
  const map = useMap();
  const [data, setData] = React.useState({} as any);

  const onLocationClick = (e: L.LeafletMouseEvent) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        healthcareProviderLocation.setLatitude(e.latlng.lat);
        healthcareProviderLocation.setLongitude(e.latlng.lng);
        healthcareProviderLocation.setAddress(data.display_name);
        healthcareProviderLocation.setState(data.address.state);
      });
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
        L.marker(e.latlng, { icon: markerIcon }).addTo(map);
        healthcareProviderLocation.setLatitude(e.latlng.lat);
        healthcareProviderLocation.setLongitude(e.latlng.lng);
        healthcareProviderLocation.setAddress(data.display_name);
        healthcareProviderLocation.setState(data.state);
      }
    });
  };

  map.on("click", onLocationClick);
  return <Marker position={center as L.LatLngExpression} icon={markerIcon} />;
}
