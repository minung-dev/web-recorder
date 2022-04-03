import React from 'react';
import PropTypes from 'prop-types';


import RecordPage from './pages/RecordPage';
import Header from './components/Header';

const extensionMode = !!chrome.runtime;
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