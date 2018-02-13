import React from 'react'
import Uploadi from '../../src'
import {ajax} from '../utils'
import c from 'classnames'
import defaultAvatar from '../default.png'

// This example shows you how you can add a loading state,
// and disabling the uploader while loading.
class LoadingSingle extends React.Component {
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

    this.setState({
      loading: true
    })

    ajax().then(() => {
      this.setState({ loading: false })
    })
  }
}

export default LoadingSingle
