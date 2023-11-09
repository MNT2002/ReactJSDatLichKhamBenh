import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"


class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <div className='img-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image outstanding-doctor'></div>
                                    </div>
                                    <div className='text-center'>
                                        <div>Hệ thống Y tế Thu Cúc 1</div>
                                        <div>Cơ xương khớp 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image outstanding-doctor'></div>
                                    </div>
                                    <div className='text-center'>
                                        <div>Hệ thống Y tế Thu Cúc 1</div>
                                        <div>Cơ xương khớp 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image outstanding-doctor'></div>
                                    </div>
                                    <div className='text-center'>
                                        <div>Hệ thống Y tế Thu Cúc 1</div>
                                        <div>Cơ xương khớp 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image outstanding-doctor'></div>
                                    </div>
                                    <div className='text-center'>
                                        <div>Hệ thống Y tế Thu Cúc 1</div>
                                        <div>Cơ xương khớp 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image outstanding-doctor'></div>
                                    </div>
                                    <div className='text-center'>
                                        <div>Hệ thống Y tế Thu Cúc 1</div>
                                        <div>Cơ xương khớp 5</div>
                                    </div>
                                </div>
                            </div>

                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
