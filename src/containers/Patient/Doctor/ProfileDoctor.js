import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInfroDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInfroDoctor(this.props.doctorId)
            this.setState({
                dataProfile: data
            })
        }
    }

    getInfroDoctor = async (id) => {
        let result = []
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ? this.capitalizeFirstLetter(moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY')) :
                moment(new Date(dataTime.date)).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, isShowLinkDetail, isShowPrice, dataTime, doctorId } = this.props
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        return (
            <div className=''>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                        {isShowLinkDetail && <div className='show-more'>
                            <Link
                                to={`/detail-doctor/${doctorId}`}>
                                Xem thêm
                            </Link>
                        </div>}
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>
                                            {dataProfile.Markdown.description}
                                        </span>}
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                {isShowPrice &&
                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price" />: {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                            <NumberFormat
                                className='price-number'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />} {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='price-number'
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
