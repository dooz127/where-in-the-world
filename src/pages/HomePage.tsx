import React, { useCallback, useEffect, useState } from 'react';

import { Country } from '../lib/types';
import { getAllCountries } from '../lib/api';
import SearchByCountry from '../components/SearchByCountry';
import FilterByRegion from '../components/FilterByRegion';
import Loader from '../components/Loader';
import CountryList from '../components/CountryList';

import styles from './HomePage.module.css';

const showCountries = (
  countries: Country[],
  selectedRegion?: string,
  query?: string
) => {
  if (!selectedRegion && !query) {
    return countries;
  }

  const result = countries.filter((country) => {
    if (selectedRegion && country.region === selectedRegion) {
      if (!query) {
        return true;
      }
      return country.name.toLowerCase().includes(query.toLowerCase());
    }

    if (query && !selectedRegion) {
      return country.name.toLowerCase().includes(query.toLowerCase());
    }

    return false;
  });

  return result;
};

type State = {
  countries: Country[];
  displayed: number;
  status: 'pending' | 'success' | 'error';
  error: string;
};

const HomePage = () => {
  const [state, setState] = useState<State>({
    countries: [],
    displayed: 0,
    status: 'pending',
    error: ''
  });
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const { countries, displayed, status, error } = state;

  const countriesToShow =
    selectedRegion || query
      ? showCountries(countries, selectedRegion, query)
      : countries.slice(0, displayed);

  const handleChange = useCallback((value: string) => setQuery(value), []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCountries();
        console.log(data);
        setState({
          countries: data,
          status: 'success',
          error: '',
          displayed: 8
        });
      } catch (err) {
        setState((prevstate) => ({
          ...prevstate,
          status: 'error',
          error: err.message
        }));
      }
    })();
  }, []);

  const onScroll = () => {
    const marginBottom = 200;
    if (
      window.innerHeight + window.scrollY + marginBottom >=
      document.body.offsetHeight
    ) {
      if (displayed < countries.length) {
        setState((prevstate) => ({
          ...prevstate,
          displayed: prevstate.displayed + 8
        }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <div className={styles['home-page']}>
      <div className={styles['form-controls']}>
        <SearchByCountry value={query} onChange={handleChange} />
        <FilterByRegion
          selectedRegion={selectedRegion}
          onChangeRegion={setSelectedRegion}
        />
      </div>
      {status !== 'success' ? (
        <div>
          {error && <div className={styles.error}>{error}</div>}
          {status === 'pending' && <Loader />}
        </div>
      ) : (
        <CountryList countries={countriesToShow} />
      )}
    </div>
  );
};

export default HomePage;
