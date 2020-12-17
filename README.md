# React Alexa APL viewer (beta)


## Install

```bash
$ npm install -S react-apl
```

## Usage

```jsx
const SimpleAPLContent = () => {
  const apl = {
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
  return (
    <APLViewer aplDocument={apl} />
  );
};
```

## Attributes

### Viewport

```jsx
      <APLViewer
        aplDocument={apl}
        options={{
          viewport: {
            width: 500,
            height: 500,
            dpi: 96
          }
        }}
        />
```

### Default Theme

```jsx

const SimpleAPLContent = () => {
  const apl = {
    "type": "APL",
    "version": "1.4",
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
  return (
      <APLViewer
        aplDocument={apl}
        options={{
          theme: 'light',
        }}
      />
  );
};
```