import type { AppConfig, CityID } from '../../../models/Config';
import {
  CONTINENTS,
  type CityMapModel,
  type ContinentType,
  continentCities,
  continentOptions,
  continentPoligons,
} from '../../../models/Continents';
import { AutoselectContainer, AutoselectsContainer, Label } from '../../../styles/Cities';
import { InputContainer } from '../../../styles/Input';
import { MainContainer } from '../../../styles/Main';
import { Autocomplete } from '../../ui/autocomplete/Autocomplete';
import { MapView } from './MapView';
import configJson from 'config';
import * as React from 'react';

const config: AppConfig = configJson;

const findCity = (cities: CityMapModel[], id?: CityID): CityMapModel | undefined => {
  if (!id) return undefined;
  return cities[cities.findIndex((c) => c.id === id)];
};

const defaultCity: CityMapModel | undefined =
  config.defaultContinent && config.defaultCityId
    ? findCity(continentCities[config.defaultContinent], config.defaultCityId)
    : undefined;

const dataId = (item: CityMapModel): CityID => item.id;
const dataLabel = (item: CityMapModel): string => item.name;

export const CitiesScreen: React.FC = React.memo(() => {
  const [continent, setContinent] = React.useState<ContinentType | undefined>(
    config.defaultContinent
  );
  const [city, setCity] = React.useState<CityMapModel | undefined>(defaultCity);

  const onContinentSelected = React.useCallback(
    (item: ContinentType) => {
      if (item && item !== continent) {
        setContinent(item);
        setCity(undefined);
      }
    },
    [continent]
  );

  return (
    <MainContainer>
      <h1>Static Data: Cities</h1>
      <AutoselectsContainer>
        <AutoselectContainer>
          <InputContainer>
            <Label>Select continent:</Label>
            <Autocomplete
              debounceInterval={config.searchInputDebounse}
              minAcceptableLength={config.minimumCitiesQueryLength}
              placeholder="Start typing to find continent..."
              data={CONTINENTS}
              autoCalculate
              onItemSelected={onContinentSelected}
              maxOptionsToShow={6}
              setInputToSelected={false}
            />
          </InputContainer>
        </AutoselectContainer>
        <AutoselectContainer>
          <InputContainer>
            <Label>Select city:</Label>
            <Autocomplete
              debounceInterval={configJson.searchInputDebounse}
              minAcceptableLength={configJson.minimumCitiesQueryLength}
              placeholder="Start typing to find cities..."
              data={continent ? continentCities[continent] : []}
              autoCalculate
              dataId={dataId}
              dataLabel={dataLabel}
              onItemSelected={setCity}
              maxOptionsToShow={9}
              setInputToSelected={false}
            />
          </InputContainer>
        </AutoselectContainer>
      </AutoselectsContainer>
      <MapView
        marker={city}
        continent={continent}
        polygon={continent && !city ? continentPoligons[continent] : undefined}
        polygonOptions={continent && !city ? continentOptions[continent] : undefined}
      />
    </MainContainer>
  );
});

CitiesScreen.displayName = 'CitiesScreen';
