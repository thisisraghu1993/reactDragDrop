import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormFeedback} from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      title: '',
      comment: '',
      description: '',
      isEdit: false,
      cardComments: [],
      isInvalidTitle: false,
      isInvalidDescription: false
    };
  }
  componentWillMount() {
    if(this.props.editList.title) {
      this.setState({
        title: this.props.editList.title,
        isEdit: true
      })
    }
    if(this.props.editList.title && this.props.editList.description) {
      this.setState({
        title: this.props.editList.title,
        description: this.props.editList.description,
        cardComments: this.props.editList.comment?JSON.parse(localStorage.getItem('cardList'))[this.props.containerId].comment:[],
        isEdit: true
      })
    }
  }
  addComment = () => {
    let containerObj = JSON.parse(localStorage.getItem('cardList'));
    containerObj[this.props.containerId].comment.push({comment: this.state.comment, time: new Date().getTime()});
    this.setState({
      cardComments: containerObj[this.props.containerId].comment
    });
    localStorage.setItem('cardList', JSON.stringify(containerObj));
  }

  editData = () => {
    let containerFormData = ['title'];
    let stateErr = null;
    if(this.props.isCard) {
      containerFormData = ['title', 'description'];
    }
    let isValidForm = containerFormData.every((field) => {
      // console.log('field'+field)
      if(this.state[field] && this.state[field] != '') {
        return true;
      } else {
        stateErr = 'isInvalidTitle';
        if(field === 'description') {
          stateErr = 'isInvalidDescription';
        }
        return false;
      }
    });
    let key1 = 'containerList';
    let obj1 = {};
    let obj2 = {};
    if(isValidForm) {
      if(!this.props.isCard) {
        if(!localStorage.getItem('containerList')) {
          
        } else {
          let cmobj  = JSON.parse(localStorage.getItem('containerList'));
          cmobj[this.props.containerId].title = this.state.title;
          cmobj[this.props.containerId].description = this.state.description;
          obj1 = cmobj;
          localStorage.setItem('containerList', JSON.stringify(cmobj))
        }
      } else {
        let containerObj = JSON.parse(localStorage.getItem('cardList'));
        let containerList  = JSON.parse(localStorage.getItem('containerList'));
        containerObj[this.props.containerId].title = this.state.title;
        containerObj[this.props.containerId].description = this.state.description;
        key1 = 'cardList';
        obj1 = containerObj;
        localStorage.setItem('cardList', JSON.stringify(containerObj));
      }
      this.props.closModal(key1, null, obj1);
    } else {
      console.log("stateErr"+stateErr);
      this.setState({
        [stateErr]: true
      })
    }
    // this.props.closModal(key1, null, obj1);
  }
  addData = () => {
    let containerFormData = ['title'];
    let stateErr = null;
    if(this.props.isCard) {
      containerFormData = ['title', 'description'];
    }
    let isValidForm = containerFormData.every((field, idx) => {
      if(this.state[field] && this.state[field] != '') {
        return true;
      } else {
        stateErr = 'isInvalidTitle';
        if(field === 'description') {
          stateErr = 'isInvalidDescription';
        }
        return false;
      }
    });
    let key1 = 'containerList';
    let key2 = 'containerPostions';
    let obj1 = {};
    let obj2 = {};
    if(isValidForm) {
      let id = new Date().getTime();
      let containerObj = {[id] : {title: this.state.title, description: this.state.description}};
      if(!this.props.isCard) {
        containerObj[id].cards = []; 
        if(!localStorage.getItem('containerList')) {
          localStorage.setItem('containerPostions', JSON.stringify([id]));
          localStorage.setItem('containerList', JSON.stringify(containerObj));
          obj1 = containerObj;
          obj2 = [id];
        } else {
          let cmobj  = JSON.parse(localStorage.getItem('containerList'));
          let containerPositions = JSON.parse(localStorage.getItem('containerPostions'));
          containerPositions.push(id);
          cmobj = {...cmobj, ...containerObj};
          localStorage.setItem('containerPostions', JSON.stringify(containerPositions));
          obj1 = cmobj;
          obj2 = containerPositions;
          localStorage.setItem('containerList', JSON.stringify(cmobj))
        }
      } else {
        let cl = JSON.parse(localStorage.getItem('cardList'));
        let containerList  = JSON.parse(localStorage.getItem('containerList'));
        containerObj[id].comment = [];
        containerList[this.props.containerId].cards.push(id);
        if(cl) {
          containerObj = {...cl, ...containerObj};
        }
        key1 = 'cardList';
        key2 = 'containerList';
        obj1 = containerObj;
        obj2 = containerList;
        localStorage.setItem('cardList', JSON.stringify(containerObj));
        localStorage.setItem('containerList', JSON.stringify(containerList));
      }
      this.props.closModal(key1, key2, obj1, obj2);
    }  else {
      console.log("stateErr"+stateErr);
      this.setState({
        [stateErr]: true
      })
    }
    // this.props.closModal(key1, key2, obj1, obj2);
  }
  render() {
    let btnTitle = "Add"
    let type = "Container";
    if(this.props.isCard) {
      type = "Card";
    }
    if(this.state.isEdit) {
      btnTitle = "Edit"; 
    }
    return (
      <div>
        <Modal isOpen={this.props.isOpen} backdrop={true} size="lg">
          <ModalHeader>{btnTitle + ' ' + type}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input style={{marginTop: 10}} value={this.state.title} onChange={(e)=>{this.setState({title: e.target.value, isInvalidTitle: false})}} placeholder="Title" invalid={this.state.isInvalidTitle}/>
                {
                  this.state.isInvalidTitle?<FormFeedback>Title Cannot Be Empty</FormFeedback>: null
                }
              </FormGroup>      
            {
              this.props.isCard?
              <FormGroup>
                <Input style={{marginTop: 10}} value={this.state.description} onChange={(e)=>{this.setState({description: e.target.value, isInvalidDescription: false})}} placeholder="Description" invalid={this.state.isInvalidDescription}/>
                {
                  this.state.isInvalidDescription?<FormFeedback>Description Cannot Be Empty</FormFeedback>: null
                }
              </FormGroup>: null
            }
            {
              this.props.isCard && this.state.isEdit?
              <div>
                <Input style={{marginTop: 10}} type="textarea" value={this.state.comment} onChange={(e)=>{this.setState({comment: e.target.value})}} placeholder="Comment"/>
                <Button style={{marginTop: 10} }color="success" onClick={() => {this.addComment()}}>Add Comment</Button>
              </div>: null
            }
            {
              this.state.cardComments.map(comment => {
                {/*<div className="card bg-info text-white">
                                  <div className="card-body">Info card</div>
                                </div>*/}
                let timeDate = new Date(comment.time).toString().split(' ');
                let date = timeDate[2]+' '+timeDate[1]+' '+timeDate[3];
                let time = new Date(comment.time).getHours() + ':' +new Date(comment.time).getMinutes()+':AM';
                if(new Date(comment.time).getHours() > 12) {
                  time = new Date(comment.time).getHours()-12 + ':' +new Date(comment.time).getMinutes()+':PM'
                }  
                return <div key={comment.time} className="card bg-basic text-black" style={{marginTop: 10}}>
                          <div className="card-body">
                            {comment.comment} 
                            <span style={{float: "right"}}>
                              {date + ' ' + time}
                            </span>
                          </div>
                        </div>
              })
            }
            </Form> 
          </ModalBody>
          <ModalFooter>
            {
              !this.state.isEdit?<Button color="primary" onClick={() => {this.addData()}}>{btnTitle}</Button>:<Button color="primary" onClick={() => {this.editData()}}>{btnTitle}</Button>
            }{' '}
            <Button color="secondary" onClick={() => {this.props.closModal()}}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;