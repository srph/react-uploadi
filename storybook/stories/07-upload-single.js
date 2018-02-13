import React from 'react'
import Uploadi from '../../src'
import axios from 'axios'
import c from 'classnames'
import defaultAvatar from '../default.png'

// This example shows you how you can do a full-blown
// file upload. Shows a loading state.
// Inspect the XHR logs in your browser's DevTools.
// Thanks to file.io!
class UploadSingle extends React.Component {
  state = {
    // Here goes the base64 parsed event
    image: '',
    // Here goes the original File
    file: null,
    // ...
    loading: false
  }

  render() {
    const {image} = this.state

    return (
      <Uploadi onFiles={this.handleFiles}>
        {({over, onSelect}) => {
          return (
            <div className={c('avatar-box', {
                '-default': !over,
                '-over': over,
                '-loading': this.state.loading
              })}>
              <img src={image || defaultAvatar} className="superpogi" />
              {!this.state.loading && !over && <div className="overlay">
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
    if (this.state.loading) {
      return
    }

    this.setState({
      file,
      image,
      loading: true
    })

    const payload = new FormData()
    payload.append('file', file)

    axios.post('https://file.io', payload).then(res => {
      this.setState({
        loading: false
      })
    }).catch(err => {
      this.setState({
        file: null,
        image: '',
        loading: false
      })
    })
  }
}

export default UploadSingle
