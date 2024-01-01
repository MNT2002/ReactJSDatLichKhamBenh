import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi'  //phải import dù ko sử dụng
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }

    componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language)
        this.setState({
            allDays: allDays,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { language } = this.props

        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(language)
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }


    //Viet hoa chu cai dau
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); //valueOf: convert sang unix time

            allDays.push(object);
        }
        return allDays;
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            } else {

            }
            console.log('check res: ', res)
        }
        // console.log(e.target.value)
    }

    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props

        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(e) => this.handleOnChangeSelect(e)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='title-calendar'>
                        <i className='fas fa-calendar-alt'></i>
                        <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            allAvailableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            }) :
                            <div className='no-schedule'>
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />!
                            </div>
                        }
                    </div>
                    {allAvailableTime && allAvailableTime.length > 0 ?
                        <div className='book-free'>
                            <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                        </div> :
                        null
                    }
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
