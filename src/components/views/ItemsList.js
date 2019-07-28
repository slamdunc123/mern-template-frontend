import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import {
  getItems,
  addItem,
  deleteItem,
  updateItem
} from '../../redux/actions/itemActions';

// reactstrap
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

// prop-types
import PropTypes from 'prop-types';

class ItemsList extends Component {
  // *** STATE ***

  // set initital local state of component
  state = {
    addModal: false,
    updateModal: false,
    id: '',
    name: ''
  };

  // get app state by getItems dispatch
  componentDidMount() {
    this.props.getItems();
  }

  // set add modal state
  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  };

  // set update modal state
  updateToggle = () => {
    this.setState({
      updateModal: !this.state.updateModal
    });
  };

  // set state when filling out form fields
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // *** ADD ITEM ***

  // set form modals state
  onAddClick = () => {
    this.setState({
      addModal: true,
      updateModal: false
    });
  };

  // render add form modal
  renderAddModal = () => {
    if (this.state.addModal) {
      return (
        <div>
          <h4>Add Modal Placeholder</h4>
          <Modal isOpen={this.state.addModal} toggle={this.addToggle}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.addToggle}>Add Item</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmitAddItem}>
                <FormGroup>
                  <Label for='item'>Item</Label>
                  <Input
                    type='text'
                    name='name'
                    id='item'
                    placeholder='Add item'
                    onChange={this.onChange}
                  />
                  <Button color='dark' style={{ marginTop: '2rem' }} block>
                    Add Item
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit add form and call addItem dispatch
  onSubmitAddItem = e => {
    e.preventDefault();
    const id = this.state.id;
    const name = this.state.name;
    console.log(id);
    console.log(name);

    const newItem = {
      name: this.state.name
    };
    console.log(newItem);
    console.log(this.state.name);
    // Add item via addItem action
    this.props.addItem(newItem);
    this.setState({
      addModal: false
    });
  };

  // *** UPDATE ITEM ***

  // set form modals state
  onUpdateClick = (id, name) => {
    console.log(id + ' clicked');
    console.log(name + ' clicked');
    this.setState({
      updateModal: true,
      addModal: false,
      id: id,
      name: name
    });
  };

  // render update form modal
  renderUpdateModal = () => {
    if (this.state.updateModal) {
      return (
        <div>
          Update Modal Placeholder
          {/* <Button
            className='btn btn-danger btn-xs float-right'
            onClick={this.closeAddModal}
          >
            X
          </Button> */}
          <Modal isOpen={this.state.updateModal} toggle={this.updateToggle}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.updateToggle}>
              Update Item - {this.state.id}
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmitUpdateItem}>
                <FormGroup>
                  <Label for='item'>Item</Label>
                  <Input
                    type='text'
                    name='name'
                    id='item'
                    // placeholder='Update item'
                    onChange={this.onChange}
                    defaultValue={this.state.name}
                  />
                  <Button color='dark' style={{ marginTop: '2rem' }} block>
                    Update Item
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit update form and call updateItem dispatch
  onSubmitUpdateItem = e => {
    e.preventDefault();
    const id = this.state.id;
    const name = this.state.name;
    console.log(id);
    console.log(name);
    console.log(this.props);

    const updatedItem = {
      name: this.state.name
    };

    this.props.updateItem(id, updatedItem);
    this.setState({
      updateModal: false
    });
  };

  // *** DELETE ITEM ***

  // call deleteItem dispatch
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  // *** RENDER COMPONENT ***

  // render main view
  render() {
    const { items } = this.props.items;
    // console.log(this.props.items);

    return (
      <div>
        {/* show modal based on state value */}
        {this.renderAddModal()}
        {this.renderUpdateModal()}

        <div className='container'>
          <button className='btn btn-primary' onClick={this.onAddClick}>
            Add Item
          </button>
          <br />
          <br />
          <table className='table table-bordered table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className='btn btn-warning btn-sm'
                      onClick={() => this.onUpdateClick(item._id, item.name)}
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => this.onDeleteClick(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// *** PROPS ***

// set prop types
ItemsList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

// dispatch actions to state in store
const mapDispatchToProps = dispatch => {
  return {
    getItems: () => {
      dispatch(getItems()); // no parameters required to get all items
    },
    addItem: newItem => {
      dispatch(addItem(newItem)); // need to include all relevant fields to Add a new object
    },
    deleteItem: id => {
      dispatch(deleteItem(id)); // need only the id (or array index) to Delete the object
    },
    updateItem: (id, updatedItem) => {
      dispatch(updateItem(id, updatedItem)); // need to include all relevant fields to Add a new object
    }
  };
};

// retrieve state from store and map to the component's props
const mapStateToProps = state => ({
  items: state.items
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
