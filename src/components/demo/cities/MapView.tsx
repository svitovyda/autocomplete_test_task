import { type CityMapModel } from '../../../models/Config';
import { type LatLngExpression, Point } from 'leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [15, 41],
});

export interface MapViewProps {
  marker: CityMapModel;
}

export const MapView: React.FC<MapViewProps> = ({ marker }) => {
  const center: LatLngExpression = [marker.lat, marker.lng];

  return (
    <MapContainer center={center} zoom={7} style={{ height: '400px', width: '600px', margin: 'auto' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[marker.lat, marker.lng]} icon={defaultIcon}>
        <Popup closeOnClick offset={new Point(0, -50)}>
          {marker.name}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
