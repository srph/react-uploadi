import React from 'react'
import T from 'prop-types'
import {DragDropContext, DropTarget} from 'react-dnd'
import HTML5Backend, {NativeTypes} from 'react-dnd-html5-backend'
import compose from './compose';

class Droppable extends React.Component {
  render() {
    return this.props.target(
      this.props.children({ over: this.props.over })
    )
  }
}

Droppable.propTypes = {
  onDrop: T.func
}

export default compose(
  DragDropContext(HTML5Backend),

  DropTarget(() => [NativeTypes.FILE], {
    drop(item, monitor, {props}) {
      props.onDrop(monitor.getItem().files)
    }
  }, (connect, monitor) => {
    return {
      target: connect.dropTarget(),
      over: monitor.isOver()
    }
  })
)(Droppable);
