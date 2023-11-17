import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpenImage: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // this.props.dispatch(actions.fetchGenderStart())
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => disupdate
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return
    
        this.setState({
            isOpenImage: true
        })
    }
    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        // console.log('Check State: ', this.state)
        // console.log('check props from redux', this.props.genderRedux)
        // console.log(genders)
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
                                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                                    </div>
                                    <div className="form-group form-group-customize col-md-6">
                                        <label for="inputPassword"><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group form-group-customize col-md-6">
                                        <label for="inputFirstName"><FormattedMessage id="manage-user.first-name" /></label>
                                        <input type="text" className="form-control" id="inputFirstName" placeholder="" />
                                    </div>
                                    <div className="form-group form-group-customize  col-md-6">
                                        <label for="inputLastName"><FormattedMessage id="manage-user.last-name" /></label>
                                        <input type="text" className="form-control" id="inputLastName" placeholder="" />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group form-group-customize  col-md-4">
                                        <label for="inputPhoneNumber"><FormattedMessage id="manage-user.phone-number" /></label>
                                        <input type="text" className="form-control" id="inputPhoneNumber" placeholder="" />
                                    </div>
                                    <div className="form-group form-group-customize col-md-8">
                                        <label for="inputAddress"><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="" />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.gender" /></label>
                                        <select id="inputGender" className="form-control">
                                            <option disabled selected>Choose...</option>
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}

                                        </select>
                                    </div>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.position" /></label>
                                        <select id="inputGender" className="form-control">
                                            <option disabled selected>Choose...</option>
                                            {positions && positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group form-group-customize  col-md-3">
                                        <label for="inputGender"><FormattedMessage id="manage-user.role" /></label>
                                        <select id="inputGender" className="form-control">
                                            <option disabled selected>Choose...</option>
                                            {roles && roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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
                                    <button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                                </div>
                            </form>
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
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
