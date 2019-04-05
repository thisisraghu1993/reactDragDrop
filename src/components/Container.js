import React, {Component, Fragment} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Card from '../components/Card';
import Header from '../components/Header';
import Modal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
export default class Example extends React.Component {
  state = {
    isOpen           : false,
    isCard           : false,
    isDelete         : false,
    containerList    : JSON.parse(localStorage.getItem('containerList'))?JSON.parse(localStorage.getItem('containerList'))        : {},
    containerPostions: JSON.parse(localStorage.getItem('containerPostions'))?JSON.parse(localStorage.getItem('containerPostions')): [],
    containerId      : null,
    cardList         : JSON.parse(localStorage.getItem('cardList'))?JSON.parse(localStorage.getItem('cardList'))                  : {},
    editList         : {},
    cardId           : null
  }
  openModal = (isCard, containerId = null) => {
    this.setState({
        isOpen: true,
        isCard,
        containerId,
        editList     : {},
        dropCardId   : null,
        rmContainerId: null
    });
  }
  editModal = (isCard, containerId, editList) => {
    this.setState({
        isOpen: true,
        isCard,
        containerId,
        editList
    });
  }
  deleteModal = (isCard, containerId, cardId = null) => {
    this.setState({
        isDelete: true,
        isCard,
        containerId,
        cardId
    }); 
  }
  closeModal = (key1, key2, data1, data2) => {
    let modalClose = 'isOpen';
    if(this.state.isDelete) {
        modalClose = 'isDelete';
    }
    this.setState({
        [modalClose]: false
    })
    if(key1 && key2) {
        this.setState({
            [key1]: data1,
            [key2]: data2
        });
    }
    if(key1) {
        this.setState({
            [key1]: data1
        });
    }
  }
  onDragEnd = (result) => {
    if(result.type !== 'column') {
        if(!result.destination || !result.destination.droppableId) {
            return 
        }
        let containerList = this.state.containerList;
        containerList[result.source.droppableId].cards.splice(result.source.index, 1);
        containerList[result.destination.droppableId].cards.splice(result.destination.index, 0, result.draggableId);
        this.setState({
            containerList
        });
        localStorage.setItem('containerList', JSON.stringify(containerList));
    } else {
        let containerPostions = this.state.containerPostions;
        if(!result.destination || result.destination.index == null) {
            return 
        }
        containerPostions.splice(result.source.index, 1);
        containerPostions.splice(result.destination.index, 0, result.draggableId);
        this.setState({
            containerPostions
        });
        localStorage.setItem('containerPostions', JSON.stringify(containerPostions));
    }
    // localStorage.setItem('containerList', JSON.stringify(containerList));
  }
  render() {
    return (
        <Fragment>
            <div className="add_btn">
                <button type="submit" className="btn btn-outline-primary" onClick={() => {this.openModal(false)}}>Add List</button>
            </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId={"nmnm"} direction="horizontal" type="column"> 
                        {(provided, snapshot) => (
                            <div className="crm_board"  ref={provided.innerRef} {...provided.droppableProps}>
                    {this.state.isOpen?
                                <Modal isOpen={this.state.isOpen} containerId={this.state.containerId} isCard={this.state.isCard} closModal={(key1, key2, data1, data2) => {this.closeModal(key1, key2, data1, data2)}} editList={this.state.editList}/>: null}
                    {this.state.isDelete?
                                <DeleteModal isOpen={this.state.isDelete} containerId={this.state.containerId} isCard={this.state.isCard} closModal={(key1, key2, data1, data2) => {this.closeModal(key1, key2, data1, data2)}} editList={this.state.editList} title="Delete Conatiner" cardId={this.state.cardId}/>: null}            
                    {
                        this.state.containerPostions.length > 0?
                        this.state.containerPostions.map((id, cidx) => {
                             return <Draggable draggableId={id} index={cidx}>
                                    {(provided, snapshot) => (
                                        <div className="card border-light card_width" key={id} ref = {provided.innerRef} {...provided.draggableProps}>
                                            <div className="card-header border-light" {...provided.dragHandleProps}>
                                                <h6 className="card-title">{this.state.containerList[id].title}
                                                    <span className="add_edit_delete_icon">
                                                        <Tooltip title="Add Card">
                                                            <AddIcon onClick={() => {this.openModal(true, id)}}/>
                                                        </Tooltip>
                                                        <Tooltip title="Edit List">
                                                            <EditIcon onClick={() => {this.editModal(false, id, this.state.containerList[id])}}/>
                                                        </Tooltip>
                                                        <Tooltip title="Delete List">
                                                            <DeleteIcon onClick={() => {this.deleteModal(false, id)}}/>
                                                        </Tooltip>
                                                    </span>
                                                </h6>
                                                <Droppable droppableId={id}> 
                                                {(provided, snapshot) => (
                                                    <div className="content_card_body" ref={provided.innerRef} {...provided.droppableProps}>
                                                        <Card cardIds={this.state.containerList[id].cards} cardList={this.state.cardList} editModal={(isCard, containerId, editList) => {this.editModal(isCard, containerId, editList)}} containerId={id} deleteModal={(isCard, containerId, editList) => {this.deleteModal(isCard, containerId, editList)}} />
                                                        {provided.placeholder}
                                                    </div>  )
                                                      }
                                                </Droppable>    
                                            </div>
                                        </div> 
                                    )}
                                    </Draggable>
                                          
                        })
                        : 
                        <div className="container mb-5 mt-5">
                            No Container Found
                        </div>
                    }
                    {provided.placeholder}
                     </div>
                        )} 
                </Droppable> 
            </DragDropContext>
         </Fragment>
         
    );
  }
}