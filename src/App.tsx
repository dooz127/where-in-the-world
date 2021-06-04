import React, { Suspense, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loader from './components/Loader';
import Header from './components/Header';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CountryDetailsPage = React.lazy(
  () => import('./pages/CountryDetailsPage')
);

import styles from './App.module.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? styles['dark'] : styles['light'];

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id="theme-toggle"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
        hidden
      />
      <div className={theme}>
        <Header />
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route path="/" exact component={HomePage} />
            <Route path="/:country" component={CountryDetailsPage} />
          </Suspense>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
