import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi'  //phải import dù ko sử dụng
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from "../../../services/userService"
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.clinic-address" />
                    </div>
                    <div className='clinic-name'>
                        {extraInfor && extraInfor.nameClinic ?
                            extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ?
                            extraInfor.addressClinic : ''}
                    </div>

                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false ?
                        <div><span className='price-title'><FormattedMessage id="patient.extra-infor-doctor.price-number" /></span>: {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                            <NumberFormat
                                className='price-number'
                                value={extraInfor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />}
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='price-number'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />}
                            <span className='btn-hide-show-detail' onClick={() => this.showHideDetailInfor(true)}> <FormattedMessage id="patient.extra-infor-doctor.see-detail" /></span>
                        </div>
                        :
                        <>
                            <div className='detail-price'>
                                <div className='price-title price-title-pop-up'>
                                    <span><FormattedMessage id="patient.extra-infor-doctor.price-number" />:</span>
                                    <span>{extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                        <NumberFormat
                                            className='price-number'
                                            value={extraInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />}
                                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className='price-number'
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />}</span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ""}
                                </div>
                            </div>
                            <div className='comment-doctor'>
                                <FormattedMessage id="patient.extra-infor-doctor.pay-by" />: {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? extraInfor.paymentTypeData.valueVi : ''} {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ? extraInfor.paymentTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span className='btn-hide-show-detail' onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price-box" />
                                </span>
                            </div>
                        </>}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
