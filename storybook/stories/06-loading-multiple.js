import React from 'react'
import Uploadi from '../../src'
import {ajax} from '../utils'
import c from 'classnames'

// We'll have a simple counter here
// to assign ids for each selected file
let id = 0

// This example shows you how you can add a loading state.
// @see https://medium.com/@srph/react-maintaining-state-for-collections-80a1d9615886
class LoadingMultiple extends React.Component {
  state = {
    // Here goes the base64 parsed events
    // [{ id: 1, url: string }]
    images: [],
    // Here goes the original `File`s
    files: [],
    // Here, we have an object that contains the ID of our images.
    // { '5': 0, '6': 32 }
    loading: {}
  }

  render() {
    const {images} = this.state

    return (
      <Uploadi multiple onFiles={this.handleFiles}>
        {({over, onSelect}) => {
          return (
            <div className={c('upload-box', { '-over': over })}>
              {Boolean(images.length) && <div className="attachment-list">
                {Boolean(images.length) && images.map((image, i) => {
                  return <div className={c('item', {
                    '-loading': this.state.loading[image.id]
                  })} key={i}>
                    <img src={image.url} className="thumb" />
                  </div>
                })}
              </div>}

              <div className="footer">
                <h1 className="heading">Drop Files</h1>
                <p className="sub"><span className="drag">Drag here</span> <span className="or">or</span> <span className="browse" onClick={onSelect}>browse</span> to upload</p>
              </div>
            </div>
          )
        }}
      </Uploadi>
    )
  }

  handleFiles = (files, images) => {
    // [string, string, string] ->
    // [{ id: 1, url: string }, { id: 2, url: string }, { id: 3, url: string }]
    images = images.map((image, i) => {
      return { id: id++, url: image }
    })

    // Assign ids to the loading state
    // { '1': true, '2': true, '3': true }
    const loading = {}
    images.forEach(image => {
      loading[image.id] = true
    })

    this.setState({
      files: [...this.state.files, ...files],
      images: [...this.state.images, ...images],
      loading: { ...this.state.loading, ...loading }
    })

    // We'll have a "fake ajax" here.
    images.forEach(image => {
      ajax().then(() => {
        const loading = { ...this.state.loading }
        delete loading[image.id]
        this.setState({ loading })
      })
    })
  }
}

export default LoadingMultiple
