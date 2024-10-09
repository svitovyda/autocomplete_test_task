import type { AppConfig } from './Config';
import configJson from 'config';
import { LatLng, type PathOptions } from 'leaflet';

const config: AppConfig = configJson;

export interface CityMapModel {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export const CONTINENTS = [
  'Europe',
  'North America',
  'South America',
  'Australia',
  'Asia',
  'Africa',
] as const;

export type ContinentType = (typeof CONTINENTS)[number];

export type ContinentsDictionary = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [key in ContinentType]: CityMapModel[];
};

export type ContinentsOptionsDictionary = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [key in ContinentType]: PathOptions;
};

export const continentCities: ContinentsDictionary = {
  Europe: config.citiesEurope,
  'South America': config.citiesNorthAmerica,
  'North America': config.citiesSouthAmerica,
  Australia: config.citiesAustralia,
  Africa: config.citiesAfrica,
  Asia: config.citiesAsia,
} as const;

export type PoligonType = LatLng[];

export type ContinentPoligonsDictionary = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [key in ContinentType]: PoligonType;
};

export const continentPoligons: ContinentPoligonsDictionary = {
  Europe: config.polygonEurope.map(([lat, lng]) => new LatLng(lat!, lng!)),
  'South America': config.polygonSouthAmerica.map(([lat, lng]) => new LatLng(lat!, lng!)),
  'North America': config.polygonNorthAmerica.map(([lat, lng]) => new LatLng(lat!, lng!)),
  Australia: config.polygonAustralia.map(([lat, lng]) => new LatLng(lat!, lng!)),
  Africa: config.polygonAfrica.map(([lat, lng]) => new LatLng(lat!, lng!)),
  Asia: config.polygonAsia.map(([lat, lng]) => new LatLng(lat!, lng!)),
};

const defaultStyle: PathOptions = {
  fillOpacity: 0.4,
  weight: 0.1,
};

export const continentOptions: ContinentsOptionsDictionary = {
  Europe: { ...defaultStyle, fillColor: config.colorEurope, color: config.colorEurope },
  Africa: { ...defaultStyle, fillColor: config.colorAfrica, color: config.colorAfrica },
  Asia: { ...defaultStyle, fillColor: config.colorAsia, color: config.colorAsia },
  'North America': {
    ...defaultStyle,
    fillColor: config.colorNorthAmerica,
    color: config.colorNorthAmerica,
  },
  'South America': {
    ...defaultStyle,
    fillColor: config.colorSouthAmerica,
    color: config.colorSouthAmerica,
  },
  Australia: { ...defaultStyle, fillColor: config.colorAustralia, color: config.colorAustralia },
};
