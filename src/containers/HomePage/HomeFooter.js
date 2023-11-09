import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <div className='coppy-right'>
                    <p>&copy; 2023 MinhNhatTran. <a target='_blank' href='https://www.facebook.com/minhnhattrannn'>More information, please visit my profile</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
