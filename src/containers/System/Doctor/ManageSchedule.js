import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'; //format date
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import {saveBulkScheduleDoctor} from '../../../services/userService';

class ManageSchesule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDortors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDortors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Please select a doctor!')
        } else if (!currentDate) {
            toast.error("Invalid date!")
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap
                    result.push(object)
                })
            } else {
                toast.error("Invalid selected time!")
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        });
        if (res && res.errCode === 0) {
            toast.success("Save succeed!")
        } else {
            toast.error("Error save bulk schedule doctor!")
        }
    }

    render() {
        // console.log('check state: ', this.state.rangeTime)
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <FormattedMessage id="manage-schedule.choose-doctor" />
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDortors}
                                className="mb-3"
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <FormattedMessage id="manage-schedule.choose-date" />
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate={ yesterday }
                                // minDate={moment().toDate()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className= {item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            onClick={() => this.handleClickBtnTime(item)}
                                            key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>

                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary mt-4'
                            onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchesule);
