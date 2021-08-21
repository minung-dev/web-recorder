import React from 'react';

type HeaderProps = {};

function Header(props: HeaderProps) {
  return (
    <div className="container navbar has-background-primary px-5 py-3">
      <h1 className="title is-4 has-text-white">Screen Recorder</h1>
    </div>
  );
}

Header.defaultProps = {
};

export default Header;