import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchByCountry.module.css';

type SearchByCountryProps = {
  value?: string;
  onChange: (value: string) => void;
};

const SearchByCountry = ({ value, onChange }: SearchByCountryProps) => {
  const [query, setQuery] = useState(value || '');

  useEffect(() => {
    const debounce = setTimeout(() => {
      onChange(query);
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [query, onChange]);

  return (
    <div className={styles.search}>
      <FontAwesomeIcon icon={faSearch} className={styles.icon} />
      <input
        className={styles['form-control']}
        aria-label="Search for a country"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchByCountry;
