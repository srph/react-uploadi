import React from 'react'
import T from 'prop-types'
import reader from './reader'
import Droppable from './Droppable'

class ReactUploadi extends React.Component {
  file = null;

  render() {
    return (
      <Droppable onDrop={this.handleDrop}>
        {({over}) =>
          <div>
            {this.props.children({
              over,
              onSelect: () => this.file.click()
            })}

            <input type="file"
              multiple={this.props.multiple}
              style={{ display: 'none' }}
              ref={c => this.file = c}
              onChange={this.handleSelect} />
          </div>
        }
      </Droppable>
    )
  }

  process(files) {
    Promise.all(files.map(file => reader(file)))
      .then(evts => {
        const results = evts.map(evt => evt.target.result);
        if (this.props.multiple) {
          this.props.onFiles(files, results)
        } else {
          this.props.onFiles(files[0], results[0])
        }
        this.file.value = null
      })
  }

  handleDrop = (files) => {
    this.process(files)
  }

  handleSelect = (evt) => {
    this.process(Array.from(evt.target.files))
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
