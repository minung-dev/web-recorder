import React from 'react';

type ButtonProps = {
  children: React.ReactChild,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="button is-primary is-fullwidth" onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
};

export default Button;