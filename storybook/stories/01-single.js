import React from 'react'
import Uploadi from '../../src'
import defaultAvatar from '../default.png'

class Single extends React.Component {
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

export default Single
