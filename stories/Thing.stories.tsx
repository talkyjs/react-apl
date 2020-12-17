import React from 'react';
import { Meta, Story } from '@storybook/react';
import { APLViewer, APLViewerProps } from '../src';

const meta: Meta = {
  title: APLViewer.name,
  component: APLViewer,
  /*
  argTypes:{
    aplDocument:{
      table:{
        disable:true
      }
    },
    datasource:{
      table:{
        disable:true
      }
    },
    viewerElementId:{
      table:{
        disable:true
      }
    },
    options:{
      table:{
        disable:true
      }
    },
    loadingContent:{
      table:{
        disable:true
      }
    },
  },
  */
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<APLViewerProps> = args => <APLViewer {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
/*
export const CustomViewPort = Template.bind({
  viewerElementId: 'custom-view-port',
  options: {
    viewport: {
      width: 2000,
      height: 1000,
      dpi: 96,
    }
  },
  aplDocument: {
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
  }
});
*/
Default.args = {
  aplDocument: {
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
  }
};
