import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-container'>
                    <div className='title-section section-about-header'>
                        Truyển thông nói gì về BookingCare
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/M62l1xA5Eu8" title="Domain là gì? Bạn đã thật sự hiểu về domain?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className='content-right'>
                        Mình dự định sẽ làm 1 website với nội dung hỗ trợ việc đặt lịch khám bệnh bác sĩ, tương tự như website: https://bookingcare.vn/ . Trong khóa học này, mình sẽ clone (sao chép) lại giao diện Frontend và tự làm hoàn toàn phần Backend cũng như cơ sở dữ liệu của dự án.
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
