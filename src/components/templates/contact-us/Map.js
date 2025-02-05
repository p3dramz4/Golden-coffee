"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ position, center, children }) {
  useEffect(() => {

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: "/images/location-marker.png", 
      shadowUrl: "/images/location-shadow.png", 
      iconSize: [30, 40], 
      shadowSize: [0, 0], 
      iconAnchor: [15, 40], 
      shadowAnchor: [15, 50], 
      popupAnchor: [0, -40], 
    });
  }, []);

  return (
    <>
      <MapContainer
        className="rounded-[16px] h-[300px] w-full z-[40]"
        center={center}
        zoom={14}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Golden Coffee</Popup>
        </Marker>
      </MapContainer>
      <div className="relative z-[40] mx-[50px] mt-[-73px] p-[7px_20px_15px_7px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.5)] rounded-[16px]">
        {children}
      </div>
    </>
  );
}
