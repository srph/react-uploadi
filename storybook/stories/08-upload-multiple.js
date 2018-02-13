import React from 'react'
import Uploadi from '../../src'
import axios from 'axios'
import c from 'classnames'

// We'll have a simple counter here
// to assign ids for each selected file
let id = 0

// This example shows you how you can do a full-blown file-upload
// with axios. Also adds a loading, progress, error, and success state.
// Inspect the XHR logs in your browser's DevTools.
// Thanks, file.io!
class UploadMultiple extends React.Component {
  state = {
    // Here goes the base64 parsed events
    // [{ id: 1, url: string }]
    images: [],
    // Here goes the original `File`s
    files: [],
    // Here, we have an object that contains the ID of our loading images.
    // { '5': 0, '6': 32 }
    progress: {},
    // Here, we have an object that contains the ID of our images with errors.
    // { '5': 0, '6': 32 }
    // To simulate this, easiest way is to upload many photos at once
    // since file.io throttles request (like 5 max connetions every second).
    error: {}
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
                  return (
                    <div className={c('item', {
                      '-loading': this.state.progress[image.id]
                    })} key={i}>
                      <img src={image.url} className='thumb' />

                      {this.state.error[image.id] && (
                        <div className='error' />
                      )}

                      {Boolean(this.state.progress[image.id]) && (
                        <div className='progress' style={{ width: this.state.progress[image.id] }} />
                      )}

                      {!this.state.error[image.id] && !this.state.progress[image.id] && (
                        <div className='success' />
                      )}
                    </div>
                  )
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

    // Assign ids to the progress state
    // { '1': 0, '2': 0, '3': 0 }
    const progress = {}
    images.forEach(image => {
      progress[image.id] = 0
    })

    this.setState({
      files: [...this.state.files, ...files],
      images: [...this.state.images, ...images],
      progress: { ...this.state.progress, ...progress }
    })

    images.forEach((image, i) => {
      const payload = new FormData()
      payload.append('file', files[i])

      axios.post(
        'https://file.io',
        payload,
        { onUploadProgress: evt => this.handleProgress(image.id, evt) }
      ).then(res => {
        const progress = { ...this.state.progress }
        delete progress[image.id]

        this.setState({
          progress
        })
      }).catch(err => {
        const progress = { ...this.state.progress }
        delete progress[image.id]

        this.setState({
          progress,
          error: { ...this.state.error, [image.id]: true }
        })
      })
    })
  }

  handleProgress = (id, evt) => {
    this.setState({
      progress: {
        ...this.state.progress,
        [id]: Math.round((evt.loaded * 100) / evt.total)
      }
    })
  }
}

export default UploadMultiple
