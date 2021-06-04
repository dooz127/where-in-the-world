import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <FontAwesomeIcon icon={faSpinner} className={styles.icon} />
    <span className={styles['loader-text']}>Loading ...</span>
  </div>
);

export default Loader;
