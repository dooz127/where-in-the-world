import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './FilterByRegion.module.css';

interface FilterByRegionProps {
  selectedRegion?: string;
  onChangeRegion: (region: string) => void;
}

const FilterByRegion = ({
  selectedRegion,
  onChangeRegion
}: FilterByRegionProps) => {
  const [showRegions, setShowRegions] = useState(false);

  const selectRegion = (region: string) => {
    onChangeRegion(region);
    setShowRegions(false);
  };

  return (
    <div className={styles.filter}>
      <button
        className={styles['selected-region']}
        onClick={() => setShowRegions(!showRegions)}
      >
        {!selectedRegion ? 'Filter by Region' : selectedRegion}
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`${styles.icon} ${showRegions ? styles.rotate : ''}}`}
        />
      </button>
      <ul
        className={styles.regions}
        style={{ display: showRegions ? 'block' : 'none' }}
      >
        <li className={styles.region}>
          <button onClick={() => selectRegion('Africa')}>Africa</button>
        </li>
        <li className={styles.region}>
          <button onClick={() => selectRegion('Americas')}>Americas</button>
        </li>
        <li className={styles.region}>
          <button onClick={() => selectRegion('Asia')}>Asia</button>
        </li>
        <li className={styles.region}>
          <button onClick={() => selectRegion('Europe')}>Europe</button>
        </li>
        <li className={styles.region}>
          <button onClick={() => selectRegion('Oceania')}>Oceania</button>
        </li>
      </ul>
    </div>
  );
};

export default FilterByRegion;
