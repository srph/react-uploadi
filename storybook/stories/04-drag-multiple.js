import React from 'react'
import Uploadi from '../../src'
import c from 'classnames'

// This example shows you how you can display
// react to multiple uploaded files
class DragMultiple extends React.Component {
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

export default DragMultiple
