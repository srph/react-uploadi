# React Uploadi [![npm version](https://img.shields.io/npm/v/@srph/react-uploadi.svg?style=flat-square)](https://npmjs.com/packages/@srph/react-uploadi) [![Build Status](https://img.shields.io/travis/srph/react-uploadi.svg?style=flat-square)](https://travis-ci.org/srph/react-uploadi?branch=master)
Build upload UIs with dropzone and previews out of the box.

- Provides a terse API to implement file upload.
- Removes the effort of dealing with [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) (usually needed to display the preview of uploaded photos).
- Dropping of files is built out of the box.
- Doesn't assume markup, styling, or template.

**Most importantly**, unlike [Dropzone.js](http://www.dropzonejs.com/), Uploadi does not handle the actual uploading of the files to a 3rd-party service / API. This means that you will have to handle ajax, maintaining the loading, progress, and error state by yourself.

Although Uploadi was meant for advanced use-cases, you are not alone by all means. Check out the [online examples](https://react-uploadi.kierb.com/) or view its [source code](storybook/uploadi.js). It showcases Uploadi's power from the simplest case to a full-blown file upload.

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
        {({onSelect}) => (
          <div>
            {image ? <img src={image} /> : 'Select a file to upload.'}
            <button onClick={onSelect}>
              Browse
            </button>
          </div>
        )}
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

> **NOTE**: Regarding the `onFiles` callback prop &mdash; The first parameter contains the original [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) event _may_ need in order to upload the selected file.
>
> The second parameter contains the [encoded string (contents of the file)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result): a [base64-encoded string](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) if it's an image, otherwise [a text string](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText).

View more [examples](storybook/uploadi.js).

### Multiple files
You can make your uploader accept multiple files by passing the `multiple={true}` prop to `Uploadi`. Take note that the `onFiles` callback is slightly different: You will receive an array of `File`s and encoded strings.

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
        {({onSelect}) => (
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
        )}
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

> **NOTE**: The `onFiles` callback prop is slightly different when `multiple` is `true`. Instead of a `File` and an encoded string, you will receive array of `Files` and array of encoded strings.

### Reacting to dropped files
By default, `Uploadi` reacts to dropped files. In order to display something when something is being dragged over to `Uploadi`, you may use the `over` property provided to the render prop like so:

```js
class App extends React.Component {
  render() {
    return (
      <Uploadi multiple onFiles={this.handleFiles}>
        {({over, onSelect}) => (
          <div>
            {over && (
              <div className="drop-overlay" />
            )}
          </div>
        )}
      </Uploadi>
    )
  }

  handleFiles = (files, images) => {
    //
  }
}

export default App;
```

> **NOTE**: The `onFiles` callback prop is slightly different when `multiple` is `true`. Instead of a `File` and an encoded string, you will receive array of `Files` and array of encoded strings.

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

## Alternatives
- [@navjobs/upload](https://github.com/navjobs/upload)
