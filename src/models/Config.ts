export interface CityMapModel {
  name: string;
  lat: number;
  lng: number;
}

export interface ApiServiceConfig {
  baseUrl: string;
  searchPath: string;
  searchQuery: string;
  minimumSearchQueryLength: number;
  searchInputDebounse: number;
  cities: CityMapModel[];
}
