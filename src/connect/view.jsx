import React, {useEffect, useState} from 'react';

import useScript from './useScript';

const scripts = [
  'https://api.callstats.io/static/connect-rtc.min.js',
  'https://api.callstats.io/static/amazon-connect.js',
  'https://api.callstats.io/static/callstats.min.js',
  'https://api.callstats.io/static/callstats-amazon-connect-shim.js',
];

function View() {
  const [loaded0, error0] = useScript(scripts[0]);
  const [loaded1, error1] = useScript(scripts[1]);
  const [loaded2, error2] = useScript(scripts[2]);
  const [loaded3, error3] = useScript(scripts[3]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const loading = !loaded0 || !loaded1 || !loaded2 || !loaded3;
      setLoading(loading);
    },
    [loaded0, loaded1, loaded2, loaded3]
  )

  useEffect(
    () => {
      if (!loading && !error0 && !error1 && !error2 && !error3) {
        import('./amazon-connect')
      }
    },
    [loading, error0, error1, error2, error3]
  )

  return (
    <>
      {
        loading && (
          <span>Loading ...</span>
        )
      }
      {
        !loading && error0 && (
          <span>Error loading {scripts[0]}</span>
        )
      }
      {
        !loading && error1 && (
          <span>Error loading {scripts[1]}</span>
        )
      }
      {
        !loading && error2 && (
          <span>Error loading {scripts[2]}</span>
        )
      }
      {
        !loading && error3 && (
          <span>Error loading {scripts[3]}</span>
        )
      }
      <div id="containerDiv" style={{
        width: '320px',
        minWidth: '200px',
        height: '465px',
        minHeight: '400px',
        margin: 'auto'
      }}>
      </div>
      <audio id="remote-audio" autoPlay></audio>
    </>
  );
}

export default View;
