export interface CityMapModel {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export type CityID = CityMapModel['id'];

export interface AppConfig {
  baseUrl: string;
  searchPath: string;
  searchQuery: string;
  minimumSearchQueryLength: number;
  minimumCitiesQueryLength: number;
  searchInputDebounse: number;
  cities: CityMapModel[];
  defaultCityId: CityID;
}
