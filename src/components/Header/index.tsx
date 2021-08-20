import React from 'react';

type HeaderProps = {};

function Header(props: HeaderProps) {
  return (
    <nav className="container navbar has-background-primary px-5 py-1" role="navigation" aria-label="main navigation">
      <div className="navbar-brand is-flex is-align-items-center">
        <h1 className="title is-4 has-text-white">Screen Recorder</h1>
      </div>
    </nav>
  );
}

Header.defaultProps = {
};

export default Header;