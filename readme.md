<div style="text-align: center">
  <img src="preview.jpg" alt="Preview">
</div>

# React Uploadi [![npm version](https://img.shields.io/npm/v/@srph/react-confirm.svg?style=flat-square)](https://npmjs.com/packages/@srph/react-confirm) [![Build Status](https://img.shields.io/travis/srph/react-confirm.svg?style=flat-square)](https://travis-ci.org/srph/react-confirm?branch=master)
The bare minimum to build file upload user interfaces

View [demo](https://barber-solders-33074.netlify.com/). View [examples](storybook/confirm.js).

## Why?
This library was built to be flexible:

- It doesn't assume markup, styling, or template.
- It only provides the bare minimum so you could build your custom uploader.

## How It Works
This library uses the render props pattern. You can read more about it [here](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

## Installation
```bash
npm install @srph/react-uploadi --save
```

### Script tags
If you're not using a bundler like Browserify or Webpack, simply add the script tag after your React script tag.

```html
<!-- Script tags for React and other libraries -->
<script src="https://unpkg.com/@srph/react-confirm/dist/react-confirm.min.js"></script>
```

This library is exposed as `ReactUploadi` (e.g., `<ReactUploadi />`).

## Usage
The following lets you build a single-file uploader:

```js
import React from 'react'
import Uploadi from '@srph/react-uploadi'

class App extends React.Component {
  state = {
    // Here goes the base64 parsed event
    image: '',
    // Here goes the original File which you may
    // need when uploading to an API / any kind of backend.
    // In most cases, you will use formdata with it.
    file: null
  }

  render() {
    const {images} = this.state

    return (
      <Uploadi onFiles={this.handleFiles}>
        {({onSelect}) => {
          return (
            <div className="avatar-box -default">
              <img src={this.state.image} className="img" />
              <div className="overlay">
                <button className="button" onClick={onSelect}>
                  Browse
                </button>
              </div>
            </div>
          )
        }}
      </Uploadi>
    )
  }

  handleFiles = (file, image) => {
    this.setState({
      file,
      image
    })
  }
}

export default App;
```

View more [examples](storybook/uploadi.js).

## API Documentation
Here's a list of props you may use to customize the component for your use-case:

| Parameter  | Type | Description |
| ----- | ---- | ----------- |
| multiple | `boolean` | Enable multiple files to be selected. Defaults to `false`. |
| accept | `string` | Files types you'd like to be selected. |
| onFiles | `function(File file, string img)` (required) | Callback called when a file is selected |
| onFiles | `function(Array<File> files, Array<string> img)` (required) | Callback called when multiple files are selected.  |

## Setup
You can check the [demo](https://barber-solders-33074.netlify.com/), or build it yourself locally:

```bash
npm install
npm run start
```

Afterwards, open up `localhost:9001` in your browser.

### Bundling package
```
npm run bundle
```

### Publish storybook
```
npm run storybook:publish
```
