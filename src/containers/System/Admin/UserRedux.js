import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpenImage: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: '',

            action: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => disupdate
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arrRole = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return

        this.setState({
            isOpenImage: true
        })
    }

    handleSaveUser = () => {
        let isvalid = this.checkValidateInput()
        if (isvalid === false) return

        let {action} = this.state
        if (action === CRUD_ACTIONS.CREATE){
            //fire redux action create user        
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        } else if (action === CRUD_ACTIONS.EDIT) {
            //fire redux action update user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }

    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input is required: ' + arrCheck[i])
                break
            }
        }
        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,

            userEditId: user.id,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <form className='col-12'>
                                <div className='col-12'>
                                    <div>{isLoadingGender === true ? 'Loading gender' : ''}</div>

                                </div>
                                <div className='col-12 add-title'>
                                    <FormattedMessage id="manage-user.add" />
                                </div>
                                <div className="row">
                                    <div className="form-group form-group-customize col-md-6">
                                        <label for="inputEmail"><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control" id="inputEmail" placeholder="Email"
                                            value={email}
                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="form-group form-group-customize col-md-6">
                                        <label for="inputPassword"><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                                            value={password}
                                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group form-group-customize col-md-6">
                                        <label for="inputFirstName"><FormattedMessage id="manage-user.first-name" /></label>
                                        <input type="text" className="form-control" id="inputFirstName" placeholder=""
                                            value={firstName}
                                            onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                                    </div>
                                    <div className="form-group form-group-customize  col-md-6">
                                        <label for="inputLastName"><FormattedMessage id="manage-user.last-name" /></label>
                                        <input type="text" className="form-control" id="inputLastName" placeholder=""
                                            value={lastName}
                                            onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group form-group-customize  col-md-4">
                                        <label for="inputPhoneNumber"><FormattedMessage id="manage-user.phone-number" /></label>
                                        <input type="text" className="form-control" id="inputPhoneNumber" placeholder=""
                                            value={phoneNumber}
                                            onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                        />
                                    </div>
                                    <div className="form-group form-group-customize col-md-8">
                                        <label for="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder=""
                                            value={address}
                                            onChange={(event) => { this.onChangeInput(event, 'address') }}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.gender" /></label>
                                        <select id="inputGender" className="form-control"
                                            value={gender}
                                            onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}

                                        </select>
                                    </div>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.position" /></label>
                                        <select id="inputGender" className="form-control"
                                            value={position}
                                            onChange={(event) => { this.onChangeInput(event, 'position') }}
                                        >
                                            {positions && positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.role" /></label>
                                        <select id="inputGender" className="form-control"
                                            value={role}
                                            onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        >
                                            {roles && roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.image" /></label>
                                        <div className='preview-img-container'>
                                            <input hidden id='previewImg' type='file' onChange={(event) => this.handleOnchangeImage(event)} />
                                            <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i>   </label>
                                            <div className='preview-img'
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                onClick={() => this.openPreviewImage()}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <button type="button"
                                        className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => this.handleSaveUser()}>
                                        {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='col-12 p-0 m-0'>
                            <TableManageUser
                                handleEditUserFromParent={this.handleEditUserFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>



                {this.state.isOpenImage === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenImage: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
