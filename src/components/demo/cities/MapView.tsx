import type { CityMapModel, ContinentType } from '../../../models/Continents';
import { Label } from '../../../styles/Cities';
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
  marker?: CityMapModel;
  continent?: ContinentType;
}

export const MapView = React.memo(({ marker, continent }: MapViewProps) => {
  const showContinent = React.useMemo(() => !marker, [marker]);
  const center: LatLngExpression = React.useMemo(
    () => (marker ? [marker.lat, marker.lng] : [50, 10]),
    [marker]
  );
  const zoom = React.useMemo(() => (showContinent ? 1 : 7), [showContinent]);

  return (
    <>
      {continent && (
        <Label>
          {marker ? `${marker?.name}, ` : ''}
          {continent}
        </Label>
      )}
      <MapContainer
        key={`MapCenter_${center?.[0].toFixed(1)}_${center?.[1].toFixed(1)}`}
        center={center}
        zoom={zoom}
        style={{ height: '350px', width: '550px', margin: 'auto' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {marker ? (
          <Marker
            key={`${continent}_${marker.id}`}
            position={[marker.lat, marker.lng]}
            icon={defaultIcon}
          >
            <Popup closeOnClick offset={new Point(0, -50)}>
              {marker.name}
            </Popup>
          </Marker>
        ) : null}
      </MapContainer>
    </>
  );
});

MapView.displayName = 'MapView';
