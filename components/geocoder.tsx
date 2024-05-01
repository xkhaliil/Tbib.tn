"use client";

import React from "react";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import L from "leaflet";
import { useMap } from "react-leaflet";

export function Geocoder() {
  const map = useMap();

  React.useEffect(() => {
    // @ts-ignore
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e: any) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);

  return null;
}
