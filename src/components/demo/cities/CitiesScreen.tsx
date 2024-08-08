import type { CityID, CityMapModel } from '../../../models/Config';
import { InputContainer } from '../../../styles/Input';
import { MainContainer } from '../../../styles/Main';
import { Autocomplete } from '../../ui/Autocomplete';
import { MapView } from './MapView';
import configJson from 'config';
import * as React from 'react';

const findCity = (cities: CityMapModel[], id: CityID): CityMapModel => {
  const index = cities.findIndex((c) => c.id === id);
  return index === -1 ? cities[0]! : cities[index]!;
};

const defaultCity: CityMapModel = findCity(configJson.cities, configJson.defaultCityId);

const dataId = (item: CityMapModel): CityID => item.id;
const dataLabel = (item: CityMapModel): string => item.name;

export const CitiesScreen: React.FC = () => {
  const [city, setCity] = React.useState<CityMapModel>(defaultCity);

  const onElementSelected = React.useCallback((item: CityMapModel) => {
    if (item) {
      setCity(item);
    }
  }, []);

  return (
    <MainContainer>
      <h1>Static Data: Cities</h1>
      <InputContainer>
        <Autocomplete
          debounceInterval={configJson.searchInputDebounse}
          minAcceptableLength={configJson.minimumCitiesQueryLength}
          placeholder="Start typing to find cities..."
          data={configJson.cities}
          autoCalculate
          dataId={dataId}
          dataLabel={dataLabel}
          onItemSelected={onElementSelected}
        />
      </InputContainer>
      <MapView marker={city} />
    </MainContainer>
  );
};
