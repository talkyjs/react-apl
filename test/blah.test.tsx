import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Thing } from '../stories/Thing.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Thing aplDocument={{
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
    }} />, div);
    //ReactDOM.unmountComponentAtNode(div);
  });
});
