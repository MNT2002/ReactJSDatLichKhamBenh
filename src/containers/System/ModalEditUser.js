import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter"
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter()
    }
    listenToEmitter() {
        //Khởi tạo event(hàm) bằng emitter
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
        console.log('didmount', this.props.currentValueUser)
        let user = this.props.currentValueUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }
    toggle = () => {
        this.props.toggleFromParent()
    }
    checkValidInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleOnChangeInput = (event, id) => {
        // this.state[id] = event.target.value
        // this.setState({
        //     ...this.state
        // },()=> {
        //     console.log('check bad state', this.state)
        // })
        // bad way

        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === true) {
            // Call api edit modal
            this.props.editUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                size="lg"
                centered
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>Edit the user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label >Email</label>
                            <input disabled type='text' onChange={(event) => { this.handleOnChangeInput(event, "email") }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label >Password</label>
                            <input disabled type='password' onChange={(event) => { this.handleOnChangeInput(event, "password") }} value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label >First name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "firstName") }} value={this.state.firstName} />
                        </div>
                        <div className='input-container'>
                            <label >Last name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "lastName") }} value={this.state.lastName} />
                        </div>
                        <div className='input-container'>
                            <label >Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, "address") }} value={this.state.address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-2' color="primary" onClick={() => this.handleSaveUser()}>
                        Save changes
                    </Button>{' '}
                    <Button className='px-2' color="secondary" onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
