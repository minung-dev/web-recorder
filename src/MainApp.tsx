import React from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button';

function MainApp() {
  return (
    <div className="container">
      <Button>녹화</Button>
    </div>
  );
}

MainApp.propTypes = {
};
MainApp.defaultProps = {
};

export default MainApp;