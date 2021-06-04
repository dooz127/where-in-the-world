import { Country } from '../lib/types';
import NoCountriesFound from './NoCountriesFound';
import CountryCard from './CountryCard';

import styles from './CountryList.module.css';

interface CountryListProps {
  countries: Country[];
}

const CountryList = ({ countries }: CountryListProps) => {
  if (countries.length === 0) {
    return <NoCountriesFound />;
  }
  return (
    <div className={styles['country-list']} style={{ overflowX: 'clip' }}>
      {countries.map((country) => (
        <CountryCard country={country} key={country.name} />
      ))}
    </div>
  );
};

export default CountryList;
