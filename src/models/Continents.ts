import type { AppConfig } from './Config';
import configJson from 'config';

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

export const continentCities: ContinentsDictionary = {
  Europe: config.citiesEurope,
  'South America': config.citiesNorthAmerica,
  'North America': config.citiesSouthAmerica,
  Australia: config.citiesAustralia,
  Africa: config.citiesAfrica,
  Asia: config.citiesAsia,
} as const;
