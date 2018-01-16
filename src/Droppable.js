import React from 'react'
import {DropTarget} from 'react-dnd'

class Droppable extends React.Component {
  render() {
    return (

    )
  }
}

export default DropTarget(props => props.accept || true, {
  drop(props) {
    //
  }
}, (connect, monitor) => {
  return {
    target: connect.dropTarget(),
    over: monitor.isOver()
  }
})(Droppable);
