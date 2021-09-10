import React from 'react';

import classnames from 'classnames';

type SectionProps = {
  className?: string,
  children?: React.ReactNode,
};

function Section({ className, children }: SectionProps) {
  return (
    <section className={classnames(className, 'px-5 py-4')}>
      {children}
    </section>
  );
}

Section.defaultProps = {
};

export default Section;