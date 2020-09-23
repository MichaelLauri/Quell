import React from 'react';
import Logo from '../images/quell_logos/QUELL-long.svg';

const Header = () => (
  <header>
    <div id="logo-main-container">
      <img id="logo-main" src={Logo} alt="Quell logo" />
    </div>

    <ul className="header-links">
      <li>
        <a href="#info">INFO</a>
      </li>
      <li>
        <a href="#demo">DEMO</a>
      </li>
      <li>
        <a href="#team-quell">TEAM</a>
      </li>
      <li>
        <a href="https://github.com/oslabs-beta/Quell" target="_blank" rel="noreferrer">
          GITHUB
        </a>
      </li>
    </ul>
  </header>
);

export default Header;
