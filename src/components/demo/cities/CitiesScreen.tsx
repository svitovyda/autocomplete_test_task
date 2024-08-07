import type { CityID, CityMapModel } from '../../../models/Config';
import { InputContainer, InputStyled } from '../../../styles/Input';
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

export const CitiesScreen: React.FC = () => {
  return (
    <MainContainer>
      <h1>Static Data: Cities</h1>
      <InputContainer>
        <Autocomplete
          debounceInterval={configJson.searchInputDebounse}
          minAcceptableLength={configJson.minimumSearchQueryLength}
          InputComponent={InputStyled}
          placeholder="Start typing to find cities..."
        />
      </InputContainer>
      <MapView marker={defaultCity} />
    </MainContainer>
  );
};
