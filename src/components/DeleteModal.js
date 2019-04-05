import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      title: '',
      comment: '',
      description: '',
      isEdit: false
    };
  }
  deleteData = () => {
    let key1 = 'containerList';
    let key2 = 'containerPostions';
    let obj1 = {};
    let obj2 = {};
    if(!this.props.isCard) {
      if(!localStorage.getItem('containerList')) {
        
      } else {
        let cmobj  = JSON.parse(localStorage.getItem('containerList'));
        let containerPostions = JSON.parse(localStorage.getItem('containerPostions'));
        let idx = containerPostions.indexOf(this.props.containerId);
        delete cmobj[this.props.containerId];
        containerPostions.splice(idx, 1);
        obj1 = cmobj;
        obj2 = containerPostions;
        localStorage.setItem('containerList', JSON.stringify(cmobj));
        localStorage.setItem('containerPostions', JSON.stringify(containerPostions))
      }
    } else {
      let containerObj = JSON.parse(localStorage.getItem('cardList'));
      let containerList  = JSON.parse(localStorage.getItem('containerList'));
      let idx = containerList[this.props.containerId].cards.indexOf(this.props.cardId);
      containerList[this.props.containerId].cards.splice(idx, 1);
      delete containerObj[this.props.cardId];
      key1 = 'cardList';
      key2 = 'containerList';
      obj1 = containerObj;
      obj2 = containerList;
      localStorage.setItem('cardList', JSON.stringify(containerObj));
      localStorage.setItem('containerList', JSON.stringify(containerList));
    }
    this.props.closModal(key1, key2, obj1, obj2);
    // this.props.closModal(key1, null, obj1);
  }
  
  render() {
    let type = 'Container';
    if(this.props.isCard) {
      type = 'Card';
    }
    return (
      <div>
        <Modal isOpen={this.props.isOpen} backdrop={true}>
          <ModalHeader>Delete {type}</ModalHeader>
          <ModalBody>
            {`Are You Sure You Want To Delete This ${type}?`}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => {this.deleteData()}}>Delete</Button>{' '}
            <Button color="secondary" onClick={() => {this.props.closModal()}}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;