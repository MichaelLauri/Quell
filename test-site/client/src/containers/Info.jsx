/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Header from '../images/headers/QUELL-headers-info w lines_2.svg';
import Dots from '../images/graphics/QUELL-dots-ombre dark.svg';
import Query from '../images/graphics/QUELL-illu-query.svg';
import Puzzle from '../images/graphics/QUELL-illu-puzzle.svg';
import Airmail from '../images/graphics/QUELL-illu-airmail_3.svg';

const Info = () => (
  <div className="info-container">
    <div id="info-header-container">
      <img id="info-header" src={Header} alt="info" />
    </div>
    <div className="info-text">
      <h4>
        Quell is an open source, lightweight client and server-side caching
        solution for GraphQL.
      </h4>
      <br />
      <div className="dots-container">
        <img id="dots" src={Dots} alt="dots" />
      </div>

      <p>
        Quell's schema-governed, type-level normalization algorithm
        deconstructs GraphQL query responses into individual graph nodes to be
        cached separately as constant-time-readable key-value pairs, with
        references to connected nodes.
      </p>
      <div className="quell-graph-container">
        <img id="quell-graph" src={Query} alt="Quell graph" />
      </div>

      <p>
        Subsequent GraphQL requests are then checked against the cached data
        store, allowing Quell to only request the data it needs by dynamically
        reformulating a new query for what's missing.
      </p>

      <div className="quell-puzzle-container">
        <img id="quell-puzzle" src={Puzzle} alt="Quell puzzle" />
      </div>
      <p>
        Query responses are then merged with the data present in the cache and
        a full response is returned seamlessly.
      </p>
      <div className="quell-airmail-container">
        <img id="quell-airmail" src={Airmail} alt="Quell airmail" />
      </div>
    </div>
  </div>
);

export default Info;
