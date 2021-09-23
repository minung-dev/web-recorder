import React from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button';

import RecordPage from './pages/RecordPage';
import Header from './components/Header';

const extensionMode = process.env.EXTENSION_MODE === 'true';
function MainApp() {
  return (
    <>
      <Header />
      <RecordPage extensionMode={extensionMode} />
    </>
  );
}

MainApp.propTypes = {
};
MainApp.defaultProps = {
};

export default MainApp;