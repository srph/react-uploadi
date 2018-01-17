import React from 'react';
import {storiesOf} from '@storybook/react';
import Uploadi from '../src'
import c from 'classnames'
import defaultAvatar from './default.png'

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
                      return <img src={image} className="item" key={i} />
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
