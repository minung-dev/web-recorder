import React from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button';

import RecordPage from './pages/RecordPage';
import Header from './components/Header';

function MainApp() {
  return (
    <>
      <Header />
      <RecordPage />
    </>
    
  );
}

MainApp.propTypes = {
};
MainApp.defaultProps = {
};

export default MainApp;