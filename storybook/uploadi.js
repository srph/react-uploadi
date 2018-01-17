import React from 'react';
import {storiesOf} from '@storybook/react';
import Uploadi from '../src'
// HAHAHAHAHA single variablem gagago
import c from 'classnames'

storiesOf('Uploadi', module)
  .add('pogi', () => {
    class Pogi extends React.Component {
      state = {
        // Here goes the base64 parsed event
        image: '',
        // Here goes the original File
        file: null
      }

      render() {
        const {images} = this.state

        return (
          <Uploadi onFiles={this.handleFiles}>
            {({dragging, onSelect}) => {
              return (
                <div className="avatar-box">
                  <img src={this.state.image} className="superpogi" />
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

      handleFiles = (files, images) => {
        this.setState({
          file: files[0],
          image: images[0]
        })
      }
    }

    return <Pogi />
  })
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
                  <div className="attachment-list">
                    {Boolean(images.length) && images.map((image, i) => {
                      return <img src={image} className="item" key={i} />
                    })}
                  </div>

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
  .add('droppable', () => {
    class Droppable extends React.Component {
      state = {
        // Here goes the base64 parsed event
        image: '',
        // Here goes the original File
        file: null
      }

      render() {
        const {images} = this.state

        return (
          <Uploadi onFiles={this.handleFiles}>
            {({over, onSelect}) => {
              return (
                <div className={c('avatar-box', { '-default': !over, '-over': over })}>
                  <img src={this.state.image} className="superpogi" />
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

      handleFiles = (files, images) => {
        this.setState({
          file: files[0],
          image: images[0]
        })
      }
    }

    return <Droppable />
  })
