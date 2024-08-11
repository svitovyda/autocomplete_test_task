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
  defaultContinent?: ContinentType;
  defaultCityId?: CityID;
}
