import React from 'react'
import T from 'prop-types'
import reader from './reader'

import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class ReactUploadi extends React.Component {
  file = null;

  render() {
    return (
      <div>
        {this.props.children({
          dragging: false,
          onSelect: () => this.file.click()
        })}

        <input type="file"
          multiple={this.props.multiple}
          style={{ display: 'none' }}
          ref={c => this.file = c}
          onChange={this.handleSelect} />
      </div>
    )
  }

  handleSelect = (evt) => {
    const files = Array.from(evt.target.files)

    Promise.all(files.map(file => reader(file)))
      .then(evts => {
        const results = evts.map(evt => evt.target.result);
        this.props.onFiles(files, results)
        this.file.value = null
      })
  }
}

ReactUploadi.propTypes = {
  multiple: T.bool,
  accept: T.string,
  onFiles: T.func.isRequired
}

ReactUploadi.defaultProps = {
  multiple: false,
}

export default ReactUploadi;
