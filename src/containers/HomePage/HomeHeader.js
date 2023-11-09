import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'

import { changeLanguageApp } from "../../store/actions"

class HomeHeader extends Component {
    
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo-wrap'>
                                <div className='header-logo'></div>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.speciality'/></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.searchdoctor'/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.healthfacility'/></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.selectroom'/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor'/></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.selectdoctor'/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.fee'/></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.checkhealth'/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support-icon'>
                                <i className='fas fa-question-circle'></i>
                                <FormattedMessage id='homeheader.support'/>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='search-container'>
                        <h1>
                        <FormattedMessage id='homeheader.title1'/>
                            <br />
                            <b><FormattedMessage id='homeheader.title2'/></b>
                        </h1>
                        <div className='search-wrap'>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input id='search-input' type='text' placeholder='Tìm bác sĩ' />
                            </div>
                        </div>
                    </div>
                    <div className='options-container'>
                        <ul className='options'>
                            <li>
                                <a href='#'>
                                    <div className='option-image'></div>
                                    <FormattedMessage id='homeheader.examination'/>
                                    <br />
                                    <FormattedMessage id='homeheader.specialist'/>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <div className='option-image'></div>
                                    <FormattedMessage id='homeheader.empty'/>
                                    <br />
                                    <FormattedMessage id='homeheader.telemedicine'/>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <div className='option-image'></div>
                                    <FormattedMessage id='homeheader.examination'/>
                                    <br />
                                    <FormattedMessage id='homeheader.general'/>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <div className='option-image'></div>
                                    <FormattedMessage id='homeheader.tests'/>
                                    <br />
                                    <FormattedMessage id='homeheader.medical'/>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <div className='option-image'></div>
                                    <FormattedMessage id='homeheader.health'/>
                                    <br />
                                    <FormattedMessage id='homeheader.mental'/>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <div className='option-image'></div>
                                    <FormattedMessage id='homeheader.empty'/>
                                    <br />
                                    <FormattedMessage id='homeheader.dentalcheckup'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
