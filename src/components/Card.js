import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Draggable} from 'react-beautiful-dnd';
import Tooltip from '@material-ui/core/Tooltip';
let   bgColor = '';
const Example = (props) => {
    return props.cardIds.map((id, idx) => {
        return <Draggable draggableId={id} index={idx}>
          {(provided, snapshot) => (
            <div className="card_card_body"
                ref        = {provided.innerRef}
                isDragging = {snapshot.isDragging}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
                <div className="card mb-1 border-light shadow" key={id} style={{backgroundColor: snapshot.isDragging ? "lightgreen": '' }}>
                    <div className="card-body">
                        <h6 className="card-title">{props.cardList[id].title}
                            <span className="edit_delete_icon">
                                <Tooltip title="Edit Card or Add Comment">
                                    <EditIcon onClick={() => {props.editModal(true, id, props.cardList[id])}}/>
                                </Tooltip>
                                <Tooltip title="Delete Card">
                                    <DeleteIcon onClick={() => {props.deleteModal(true, props.containerId, id)}}/>
                                </Tooltip>
                            </span>
                            {/* {<span className="edit_delete_icon">
                                <i className="material-icons" onClick={() => {props.editModal(true, id, props.cardList[id])}}>edit</i>&nbsp;
                                <i className="material-icons" onClick={() => {props.deleteModal(true, props.containerId, id)}}>delete</i>
                            </span>} */}
                        </h6>
                        <small className="text-muted">{props.cardList[id].description}</small>
                    </div>
                </div>
            </div>
          )}
        </Draggable>;  
    })
};

export default Example; 