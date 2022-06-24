import React from 'react';
import PropTypes from 'prop-types';


import RecordPage from './pages/RecordPage';
import Header from './components/Header';
import Adfit from './components/Adfit';

const extensionMode = !!chrome.runtime;
function MainApp() {
  return (
    <>
      <Header />
      <RecordPage extensionMode={extensionMode} />
      {/* <Adfit /> */}
      <iframe src='/adfit' height={80} />
    </>
  );
}

MainApp.propTypes = {
};
MainApp.defaultProps = {
};

export default MainApp;