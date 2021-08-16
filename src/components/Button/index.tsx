import React from 'react';

type ButtonProps = {
  children: React.ReactChild
};

function Button({ children }: ButtonProps) {
  return (
    <button className="button is-primary">
      {children}
    </button>
  );
}

Button.defaultProps = {
};

export default Button;