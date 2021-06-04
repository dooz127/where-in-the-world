import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getCountryDetails, getCountryNameByCode } from '../lib/api';
import { Country, Currency, Language } from '../lib/types';
import Loader from '../components/Loader';

import styles from './CountryDetails.module.css';

interface CountryDetailsProps {
  countryName: string;
}

type State = {
  country: Country | undefined;
  status: 'pending' | 'success' | 'error';
  error: string;
};

const CountryDetails = ({ countryName }: CountryDetailsProps) => {
  const history = useHistory();

  const [state, setState] = useState<State>({
    country: undefined,
    status: 'pending',
    error: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getCountryDetails(countryName);

        if (data[0].borders.length > 0) {
          const borders = await Promise.all(
            data[0].borders.map(
              async (alpha3code: string) =>
                await getCountryNameByCode(alpha3code)
            )
          );

          setState({
            country: { ...data[0], borders },
            status: 'success',
            error: ''
          });
        } else {
          setState({
            country: { ...data[0], borders: undefined },
            status: 'success',
            error: ''
          });
        }
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          status: 'error',
          error: err.message
        }));
      }
    })();
  }, [countryName]);

  const { country, status, error } = state;

  if (!country || status === 'pending') {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    borders
  } = country;

  const currencies = country.currencies.map(
    (currency: Currency) => currency.name
  );
  const languages = country.languages.map(
    (language: Language) => language.name
  );

  return (
    <div className={styles['country-details']}>
      <div className={styles.flag}>
        <img src={flag} alt={`Flag of ${name}`} />
      </div>
      <div className={styles.details}>
        <h2 className={styles['country-name']}>{name}</h2>
        <div className={styles.info}>
          <ul className={`${styles['info-list']} ${styles['info-list-1']}`}>
            <li className={styles['info-item']}>
              <span>Native Name: </span> {nativeName}
            </li>
            <li className={styles['info-item']}>
              <span>Population: </span> {population.toLocaleString()}
            </li>
            <li className={styles['info-item']}>
              <span>Region: </span> {region}
            </li>
            <li className={styles['info-item']}>
              <span>Sub Region: </span> {subregion}
            </li>
            <li className={styles['info-item']}>
              <span>Capital: </span> {capital}
            </li>
          </ul>
          <ul className={`${styles['info-list']} ${styles['info-list-2']}`}>
            <li className={styles['info-item']}>
              <span>Top Level Domain: </span>
              {topLevelDomain.toString()}
            </li>
            <li className={styles['info-item']}>
              <span>Currencies: </span>
              {currencies.join(', ')}
            </li>
            <li className={styles['info-item']}>
              <span>Languages: </span>
              {languages.join(', ')}
            </li>
          </ul>
        </div>
        <div className={styles['border-countries']}>
          <span>Border Countries: </span>
          <div>
            {borders &&
              borders.map((country) => (
                <button
                  onClick={() => history.push(`/${country}`)}
                  className={styles['btn-country']}
                  key={country}
                >
                  {country}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
