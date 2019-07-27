import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        {/* <a
          href="https://mobile.twitter.com/xwartzz"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '} */}
        {/* &bull;{' '} */}
        <span>Personal blog by </span>
        <a
          href="https://github.com/xwartz"
          target="_blank"
          rel="noopener noreferrer"
        >
          xwartz
        </a>
      </footer>
    );
  }
}

export default Footer;
