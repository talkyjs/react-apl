import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { APLViewer } from '../.';
import { useState } from 'react';

const App = () => {
  const [apl] = useState({
    "type": "APL",
    "version": "1.4",
    "theme": "dark",
    "mainTemplate": {
      "parameters": [],
      "items": [
        {
          "type": "Container",
          "alignItems": "center",
          "justifyContent": "spaceAround",
          "items": [
            {
              "type": "Text",
              "text": "Hello",
              "fontSize": "50px",
              "color": "rgb(251,184,41)"
            }
          ]
        }
      ]
    }
  })
  return (
    <div>
      <pre><code>{JSON.stringify(apl,null,2)}</code></pre>
      <APLViewer
        aplDocument={apl}
        viewerElementId="test"
        options={{
          viewport: {
            width: 640,
            height: 640,
            dpi: 96
          }
        }}
        />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
