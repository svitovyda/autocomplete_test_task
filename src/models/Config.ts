import type { CityMapModel, ContinentType } from './Continents';

export type CityID = CityMapModel['id'];

export interface AppConfig {
  baseUrl: string;
  searchPath: string;
  searchQuery: string;
  minimumSearchQueryLength: number;
  minimumCitiesQueryLength: number;
  searchInputDebounse: number;
  citiesEurope: CityMapModel[];
  citiesNorthAmerica: CityMapModel[];
  citiesSouthAmerica: CityMapModel[];
  citiesAustralia: CityMapModel[];
  citiesAfrica: CityMapModel[];
  citiesAsia: CityMapModel[];
  polygonEurope: [number, number][];
  polygonNorthAmerica: [number, number][];
  polygonSouthAmerica: [number, number][];
  polygonAustralia: [number, number][];
  polygonAfrica: [number, number][];
  polygonAsia: [number, number][];
  colorEurope: string;
  colorNorthAmerica: string;
  colorSouthAmerica: string;
  colorAustralia: string;
  colorAfrica: string;
  colorAsia: string;
  defaultContinent?: ContinentType;
  defaultCityId?: CityID;
}
