import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUser.scss"
import * as actions from "../../../store/actions"

class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.listUsers !== prevProps.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    hanldeEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
       
    }

    render() {
        let arrUsers = this.state.usersRedux

        return (
            <div className='users-table-box mt-3 mx-1'>
                <table className='users-table'>
                    <thead>
                        <tr>
                            <td>Email</td>
                            <td>First name</td>
                            <td>Last name</td>
                            <td>Address</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.hanldeEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete' onClick={() =>  this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id)=> dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
 