import React from 'react';

type HeaderProps = {};

function Header(props: HeaderProps) {
  return (
    <div className="container is-flex is-justify-content-center px-5 py-3">
      <h1 className="title is-4 has-text-weight-bold">
        <span className="has-text-primary">Web</span> Recorder
      </h1>
    </div>
  );
}

Header.defaultProps = {
};

export default Header;