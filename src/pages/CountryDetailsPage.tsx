import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import CountryDetails from '../components/CountryDetails';

import styles from './CountryDetailsPage.module.css';

interface Params {
  name: string;
}

const CountryDetailsPage = ({
  history,
  location
}: RouteComponentProps<Params>) => {
  return (
    <div className={styles['country-details-page']}>
      <div>
        <button className={styles['btn-back']} onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          <span>Back</span>
        </button>
      </div>
      <CountryDetails countryName={location.pathname.substring(1)} />
    </div>
  );
};

export default CountryDetailsPage;
