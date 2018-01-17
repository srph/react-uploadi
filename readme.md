# React Uploadi [![npm version](https://img.shields.io/npm/v/@srph/react-uploadi.svg?style=flat-square)](https://npmjs.com/packages/@srph/react-uploadi) [![Build Status](https://img.shields.io/travis/srph/react-uploadi.svg?style=flat-square)](https://travis-ci.org/srph/react-uploadi?branch=master)
The bare minimum to build file upload user interfaces

View [demo](https://react-uploadi.kierb.com/). View [examples](storybook/uploadi.js).

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
<script src="https://unpkg.com/@srph/react-uploadi/dist/react-uploadi.min.js"></script>
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
    const {image} = this.state

    return (
      <Uploadi onFiles={this.handleFiles}>
        {({onSelect}) => {
          return (
            <div>
              {image ? <img src={image} /> : 'Select a file to upload.'}
              <button onClick={onSelect}>
                Browse
              </button>
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

> **NOTE**: Regarding the `onFiles` callback prop &mdash; The first parameter contains the original [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) event _may_ need in order to upload the selected file. The second parameter contains the [encoded string (contents of the file)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result): a [base64-encoded string](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) if it's an image, otherwise [a text string](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText).

### Multiple files
You can make your uploader accept multiple files by passing the `multiple={true}` prop to `Uploadi`. Take note that the `onFiles` callback is slightly different: You will receive an array of `File`s and Images.

```js
class App extends React.Component {
  state = {
    images: [],
    files: []
  }

  render() {
    const {images} = this.state

    return (
      <Uploadi multiple onFiles={this.handleFiles}>
        {({onSelect}) => {
          return (
            <div>
              {images.length
                ? images.map((image, i) => (
                  <img src={image} key={i} />
                )) : 'Select a file to upload.'
              }

              <button onClick={onSelect}>
                Browse
              </button>
            </div>
          )
        }}
      </Uploadi>
    )
  }

  handleFiles = (files, images) => {
    this.setState({
      files,
      images
    })
  }
}

export default App;
```

> **NOTE**: The `onFiles` callback prop is slightly different here. Instead of a `File` and an encoded string, you will receive array of `Files` and array of encoded strings.

View more [examples](storybook/uploadi.js).

### Reacting to dropped files
By default, `Uploadi` reacts to dropped files. In order to display something, you may use the `over` property provided by the render prop like so:

```js
class App extends React.Component {
  render() {
    return (
      <Uploadi multiple onFiles={this.handleFiles}>
        {({over, onSelect}) => {
          return (
            <div>
              {over && (
                <div className="drop-overlay" />
              )}
            </div>
          )
        }}
      </Uploadi>
    )
  }

  handleFiles = (files, images) => {
    //
  }
}

export default App;
```

> **NOTE**: The `onFiles` callback prop is slightly different here. Instead of a `File` and an encoded string, you will receive array of `Files` and array of encoded strings.

View more [examples](storybook/uploadi.js).

## API Documentation
Here's a list of props you may use to customize the component for your use-case:

| Parameter  | Type | Description |
| ----- | ---- | ----------- |
| multiple | `boolean` | Enable multiple files to be selected. Defaults to `false`. |
| accept | `string` | Files types you'd like to be selected. |
| onFiles | `function(File file, string img)` (required) | Callback called when a file is selected. |
| onFiles | `function(Array<File> files, Array<string> img)` (required) | Callback called when `multiple` is `true`. |

## Setup
You can check the [demo](https://react-uploadi.kierb.com/), or build it yourself locally:

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

## Attribution
Big thanks to [Pavlo Tyshchuk](https://dribbble.com/pavlotyschuk) for his [Free User pics](https://dribbble.com/shots/1938508-Free-User-pics) used in the examples.
