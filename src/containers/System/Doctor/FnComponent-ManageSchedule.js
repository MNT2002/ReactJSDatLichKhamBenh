import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions"
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'; // format date
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

const ManageSchedule = ({ allDoctors, allScheduleTime, fetchAllDoctorsRedux, fetchAllScheduleTime, language }) => {
    const [listDortors, setListDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [currentDate, setCurrentDate] = useState('');
    const [rangeTime, setRangeTime] = useState([]);

    useEffect(() => {
        fetchAllDoctorsRedux();
        fetchAllScheduleTime();
    }, [fetchAllDoctorsRedux, fetchAllScheduleTime]);

    const buildDataInputSelect = (inputData) => {
        let result = []
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

    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [allDoctors]);

    useEffect(() => {
        let data = allScheduleTime;
        if (data && data.length > 0) {
            data = data.map(item => ({ ...item, isSelected: false }));
        }
        setRangeTime(data);
    }, [allScheduleTime]);

    const handleChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor);
    };

    const handleOnchangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    }

    const handleClickBtnTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            let updatedRangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            });
            setRangeTime(updatedRangeTime);
        }
    }

    const handleSaveSchedule = async () => {
        let result = [];

        if (_.isEmpty(selectedDoctor)) {
            toast.error('Please select a doctor!')
        } else if (!currentDate) {
            toast.error("Invalid date!")
        }

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
                            value={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDortors}
                            className="mb-3"
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <FormattedMessage id="manage-schedule.choose-date" />
                        <DatePicker
                            className='form-control'
                            onChange={handleOnchangeDatePicker}
                            value={currentDate}
                            minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                        />
                    </div>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => (
                                <button
                                    className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                    onClick={() => handleClickBtnTime(item)}
                                    key={index}>
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            ))}
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary mt-4' onClick={handleSaveSchedule}>
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
