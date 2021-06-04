import { useHistory } from 'react-router-dom';

import { Country } from '../lib/types';

import styles from './CountryCard.module.css';

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const history = useHistory();

  const navigateToCountry = () => history.push(`/${country.name}`);

  const { flag, name, population, region, capital } = country;

  return (
    <div
      className={styles.country}
      onClick={navigateToCountry}
      onKeyDown={(e) => e.key === 'Enter' && navigateToCountry()}
      role="button"
      tabIndex={0}
    >
      <div className={styles.flag}>
        <img src={flag} alt={`Flag of ${name}`} />
      </div>
      <div className={styles['country-info']}>
        <h2>{name}</h2>
        <p>
          <span>Population: </span>
          {population.toLocaleString()}
        </p>
        <p>
          <span>Region: </span> {region}
        </p>
        <p>
          <span>Capital: </span> {capital}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
