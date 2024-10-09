import type { CityMapModel, ContinentType, PoligonType } from '../../../models/Continents';
import { Label } from '../../../styles/Cities';
import { LatLng, type PathOptions, Point } from 'leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [15, 41],
});

export const continentCanter = (polygon: PoligonType): LatLng => {
  const maxPoint: LatLng = polygon.reduce(
    (max, curr) => new LatLng(Math.max(max.lat, curr.lat), Math.max(max.lng, curr.lng)),
    new LatLng(-Infinity, -Infinity)
  );
  const minPoint: LatLng = polygon.reduce(
    (min, curr) => new LatLng(Math.min(min.lat, curr.lat), Math.min(min.lng, curr.lng)),
    new LatLng(Infinity, Infinity)
  );
  return new LatLng((minPoint.lat + maxPoint.lat) / 2, (minPoint.lng + maxPoint.lng) / 2);
};

export interface MapViewProps {
  marker?: CityMapModel;
  continent?: ContinentType;
  polygon?: PoligonType;
  polygonOptions?: PathOptions;
}

export const MapView = React.memo(
  ({ marker, continent, polygon, polygonOptions }: MapViewProps) => {
    const center: LatLng = React.useMemo(
      () =>
        marker
          ? new LatLng(marker.lat, marker.lng)
          : polygon
            ? continentCanter(polygon)
            : new LatLng(50, 10),
      [marker, polygon]
    );
    const zoom = React.useMemo(() => (marker ? 7 : continent ? 2 : 1), [marker, continent]);

    return (
      <>
        {continent && (
          <Label>
            {marker ? `${marker?.name}, ` : ''}
            {continent}
          </Label>
        )}
        <MapContainer
          key={`MapCenter_${center?.lat.toFixed(1)}_${center?.lng.toFixed(1)}`}
          center={center}
          zoom={zoom}
          style={{ height: '350px', width: '550px', margin: 'auto' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {marker ? (
            <Marker position={[marker.lat, marker.lng]} icon={defaultIcon}>
              <Popup closeOnClick offset={new Point(0, -50)}>
                {marker.name}
              </Popup>
            </Marker>
          ) : polygon ? (
            <Polygon pathOptions={polygonOptions} positions={polygon} />
          ) : null}
        </MapContainer>
      </>
    );
  }
);

MapView.displayName = 'MapView';
