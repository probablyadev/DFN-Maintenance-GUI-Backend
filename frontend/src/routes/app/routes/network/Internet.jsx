import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import {checkInternet, restartModem} from '../../../../actions/api';
import { checkInternetSelector, restartModemSelector } from '../../../../selectors/api';

const minWidthStyle = {
    minWidth: '135px'
};

function mapStateToProps(state) {
    return {
        //checkInternetData: checkInternetSelector(state).data,
        //checkInternetError: checkInternetSelector(state).error,
        restartModemData: restartModemSelector(state).data,
        restartModemError: restartModemSelector(state).error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkInternet,
        restartModem
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Internet extends React.Component {
    constructor(props) {
        super(props);

        this.notificationSystem = null;

        // TODO: Add a button for viewing the full ping output.
        this.notifications = [
            {
                uid: 'internet restart modem success',
                level: 'success',
                title: 'Restart Modem Success',
                message: 'Modem successfully restarted',
                position: 'tr',
                autoDismiss: 5
            },
            {
                uid: 'internet restart modem failure',
                level: 'error',
                title: 'Restart Modem Error',
                message: 'Error while restarting the Modem',
                position: 'tr',
                autoDismiss: 5
            }
        ];

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    componentDidMount() {
        // Grab a reference to the notification system object in render().
        this.notificationSystem = this.refs.notificationSystem;
    }

    onSuccess(params) {
        this.notificationSystem.addNotification(
            {
                uid: 'internet check internet success',
                level: 'success',
                title: 'Check Internet Success',
                message: `IP: ${params.data.ipAddress}`,
                position: 'tr',
                autoDismiss: 5
            }
        );
    }

    onFailure(params) {
        this.notificationSystem.addNotification(
            {
                uid: 'internet check internet failure',
                level: 'error',
                title: 'Check Internet Error',
                message: 'Error while either pinging google or retrieving the machines IP',
                position: 'tr',
                autoDismiss: 5
            }
        );
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-default'>
                        <div className='box-header'>Internet</div>
                        <div className='box-body text-center'>
                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.checkInternet(this.onSuccess, this.onFailure)}>
                                Check Internet Connection
                            </Button>
                            <div className='divider' />

                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.restartModem()}>
                                Restart Modem
                            </Button>
                            <div className='divider' />
                        </div>
                    </div>

                </div>
                <NotificationSystem ref="notificationSystem"/>
            </div>
        );
    }
}

export default Internet;
