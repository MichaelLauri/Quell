/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Query from './Query';
import DemoButton from '../components/DemoButton';
import QueryResults from '../components/QueryResults';
import Metrics from '../components/Metrics';
import Graph from '../components/Graph';
import Quell from '../../../../quell-client/Quellify';
import { CreateQueryStr } from '../helper-functions/HelperFunctions';
import Header from '../images/headers/QUELL-headers-demo w lines.svg';

/*
  Container that renders the whole demo dashboard
*/

const Demo = () => {
  const [queryResponse, setQueryResponse] = useState({});
  const [fetchTime, setFetchTime] = useState('0.00 ms');
  const [fetchTimeIntegers, setFetchTimeIntegers] = useState([0, 0]);
  const [cacheStatus, setCacheStatus] = useState('');
  const [output, setOutput] = useState({ countries: ['id'] });
  const [resetComponent, setResetComponent] = useState(false);

  const formatTimer = (time) => `${time.toFixed(2)} ms`;

  // ============================================================== //
  // === Function that makes the fetch request to run the query === //
  // ============================================================== //

  const handleRunQueryClick = () => {
    // Need to run the output state component through
    // a parser that actually formats it like a graphQL query
    const parsedResult = CreateQueryStr(output);
    // console.log('Input when you "Run Query":',
    // parsedResult); // --> uncomment if you want to check the actual input we are running

    // start the timer (eventually displayed in Metrics)
    let startTime; let
      endTime;
    // eslint-disable-next-line prefer-const
    startTime = performance.now();

    // Make the fetch request
    Quell(
      '/graphql', // our route
      parsedResult, // our input
      {
        countries: 'Country',
        country: 'Country',
        citiesByCountryId: 'City',
        cities: 'City',
      },
      { cities: 'City' },
    )
      .then((res) => {
        endTime = performance.now(); // stop the timer
        const time = endTime - startTime; // calculate how long it took

        // Set Query Response state
        setQueryResponse(res.data);

        // Set Timer State
        const rawTime = time;
        const fTime = formatTimer(rawTime);
        setFetchTime(fTime);

        // Set Line Graph
        const newTime = Number(rawTime.toFixed(3));
        setFetchTimeIntegers([...fetchTimeIntegers, newTime]);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  // Runs when we Clear Cache
  const handleClearCacheClick = () => {
    // Cache/FetchTime
    setFetchTime('0.00 ms');
    // Clear sessionStorage
    sessionStorage.clear();
    // Time cleared
    const date = new Date();
    setCacheStatus(date.toLocaleTimeString());
    // Zero-out line graph
    setFetchTimeIntegers([0, 0]);
  };

  // Runs when we click Reset All
  const handleResetAll = () => {
    // Query default
    setResetComponent(!resetComponent);
    // Reset output
    setOutput({ countries: ['id'] });
    // Zero-out results
    setQueryResponse({});
    // Zero-out cache/FetchTime
    setFetchTime('0.00 ms');
    // Clear sessionStorage
    sessionStorage.clear();
    // Time cleared
    setCacheStatus('');
    // Zero-out line graph
    setFetchTimeIntegers([0, 0]);
  };

  return (
    <div id="demo">
      <div id="demo-header-container">
        <img id="demo-header" alt="demo" src={Header} />
      </div>
      <div className="demo-inst-container">
        <p className="demo-inst">It's time to take Quell for a spin!</p>
        <br />
        <p className="demo-inst">
          Below is a sample GraphQL query that you can manipulate using the
          drop-down, plus, and minus buttons. Click
          {' '}
          <em>Run Query</em>
          {' '}
          to
          initiate the request/response cycle. To clear the client-side cache,
          click
          {' '}
          <em>Clear Session Cache</em>
          {' '}
          or alternatively clear the
          server-side cache by clicking
          {' '}
          <em>Clear Server Cache</em>
          .
          {' '}
          <em>Reset All</em>
          {' '}
          will take you back to square one.
        </p>
        <br />
        <p className="demo-inst">
          <em>Suggestions:</em>
        </p>
        <ul>
          <li>
            Try running a query and take note of how long it takes (in
            milliseconds) for the fetched data to be returned from the server.
          </li>
          <li>
            Now, try running the same query again to see Quell client-side
            caching in action! You'll notice a dramatic reduction in the fetch
            time.
          </li>
          <li>
            Try clearing the Session Cache and run the same query again. You'll
            now only be seeing the effects of Quell server-side caching.
          </li>
          <li>
            Play around and try adding and removing fields to see Quell's
            partial query caching hard at work under the hood.
          </li>
        </ul>
      </div>

      <div className="dashboard-grid">
        <div className="button-grid">
          {/* All of the buttons at the top of the demo */}
          <DemoButton
            text="Run Query"
            func={handleRunQueryClick}
            classname="button-query button-query-primary"
          />
          <DemoButton
            text="Clear Session Cache"
            func={handleClearCacheClick}
            classname="button-query button-query-secondary"
          />
          <DemoButton
            text="Clear Server Cache"
            func={handleClearCacheClick}
            classname="button-query button-query-secondary"
          />
          <DemoButton
            text="Reset All"
            func={handleResetAll}
            classname="button-query button-query-secondary"
          />
        </div>
        <Query output={output} key={resetComponent} setOutput={setOutput} />
        {' '}
        {/* The key prop makes it so that when component changes,
         it completely reloads -- useful when clicking "Reset All" */}
        <Metrics fetchTime={fetchTime} cacheStatus={cacheStatus} />
        <QueryResults queryResponse={queryResponse} />
        <Graph fetchTimeIntegers={fetchTimeIntegers} />
      </div>
    </div>
  );
};

export default Demo;
