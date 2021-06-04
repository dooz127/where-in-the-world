import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Where in the world?</h1>
      <label className="toggleTheme" htmlFor="theme-toggle">
        <FontAwesomeIcon icon={faMoon} className={styles.icon} />
        <span>Dark Mode</span>
      </label>
    </header>
  );
};

export default Header;
