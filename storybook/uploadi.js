import React from 'react';
import {storiesOf} from '@storybook/react';
import Uploadi from '../src'
import c from 'classnames'
import defaultAvatar from './default.png'
import {ajax} from './utils'
import axios from 'axios'

storiesOf('Uploadi', module)
  .add('single', () => {
    class Pogi extends React.Component {
      state = {
        // Here goes the base64 parsed event
        image: '',
        // Here goes the original File
        file: null
      }

      render() {
        const {image} = this.state

        return (
          <Uploadi onFiles={this.handleFiles}>
            {({onSelect}) => {
              return (
                <div className="avatar-box -default">
                  <img src={image || defaultAvatar} className="superpogi" />
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

    return <Pogi />
  })
  // This example shows you how you can display
  // react to multiple uploaded files
  .add('multiple', () => {
    class Multiple extends React.Component {
      state = {
        // Here goes the base64 parsed events
        images: [],
        // Here goes the original `File`s
        files: []
      }

      render() {
        const {images} = this.state

        return (
          <Uploadi multiple onFiles={this.handleFiles}>
            {({dragging, onSelect}) => {
              return (
                <div className="upload-box">
                  {Boolean(images.length) && <div className="attachment-list">
                    {Boolean(images.length) && images.map((image, i) => {
                      return <div className="item" key={i}>
                        <img src={image} className="thumb" />
                      </div>
                    })}
                  </div>}

                  <div className="footer">
                    <h1 className="heading">Drop Files</h1>
                    <p className="sub">Drag here <span className="or">or</span> <span className="browse" onClick={onSelect}>browse</span> to upload</p>
                  </div>
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

    return <Multiple />
  })
  // This example shows you how you can display
  // something when user attempts to drag a file.
  .add('react to drag over', () => {
    class Droppable extends React.Component {
      state = {
        // Here goes the base64 parsed event
        image: '',
        // Here goes the original File
        file: null
      }

      render() {
        const {image} = this.state

        return (
          <Uploadi onFiles={this.handleFiles}>
            {({over, onSelect}) => {
              return (
                <div className={c('avatar-box', { '-default': !over, '-over': over })}>
                  <img src={image || defaultAvatar} className="superpogi" />
                  {!over && <div className="overlay">
                    <button className="button" onClick={onSelect}>
                      Browse
                    </button>
                  </div>}
                  {over && <div className="overlay2">
                    <div className="dashed" />
                  </div>}
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

    return <Droppable />
  })

  // This example shows you how you can display
  // react to multiple uploaded files
  .add('react to drag over (multiple)', () => {
    class MultipleDragOver extends React.Component {
      state = {
        // Here goes the base64 parsed events
        images: [],
        // Here goes the original `File`s
        files: []
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
                      return <div className="item" key={i}>
                        <img src={image} className="thumb" />
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
        this.setState({
          files,
          images
        })
      }
    }

    return <MultipleDragOver />
  })

  // This example shows you how you can add a loading state.
  // @see https://medium.com/@srph/react-maintaining-state-for-collections-80a1d9615886
  .add('loading state for multiple uploads', () => {
    // We'll have a simple counter here
    // to assign ids for each selected file
    let id = 0

    class MultipleLoadingState extends React.Component {
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

    return <MultipleLoadingState />
  })

  // This example shows you how you can do a full-blown file-upload
  // with axios. Also adds a loading, progress, error, and success state.
  // Thanks, file.io!
  .add('actual file upload', () => {
    // We'll have a simple counter here
    // to assign ids for each selected file
    let id = 0

    class FullBlownFileUpload extends React.Component {
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
        error: {},
        // Here, we have an object that contains the ID of our images that have been uploaded.
        // { '5': 0, '6': 32 }
        success: {}
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
        // { '1': true, '2': true, '3': true }
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
            { onUploadProgress: evt => this.handleProgress(id, evt) }
          ).then(res => {
            const progress = { ...this.state.progress }
            delete progress[image.id]

            this.setState({
              progress,
              success: { ...this.state.success, [image.id]: true }
            })
          }).catch(err => {
            const progress = { ...this.state.progress }
            delete progress[image.id]

            this.setState({
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

    return <FullBlownFileUpload />
  })
