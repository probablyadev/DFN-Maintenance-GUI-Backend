import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import {checkInternet, restartModem} from '../../../../actions/api';

const minWidthStyle = {
    minWidth: '135px'
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkInternet,
        restartModem
    }, dispatch);
}

@connect(null, mapDispatchToProps)
class Internet extends React.Component {
    constructor(props) {
        super(props);

        this.notificationSystem = null;

        this.onCheckSuccess = this.onCheckSuccess.bind(this);
        this.onCheckFailure = this.onCheckFailure.bind(this);
        this.onRestartNotify = this.onRestartNotify.bind(this);
        this.onRestartSuccess = this.onRestartSuccess.bind(this);
        this.onRestartFailure = this.onRestartFailure.bind(this);
    }

    componentDidMount() {
        // Grab a reference to the notification system object in render().
        this.notificationSystem = this.refs.notificationSystem;
    }

    // TODO: Add a button for viewing the full ping output.
    onCheckSuccess(params) {
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

    onCheckFailure(params) {
        this.notificationSystem.addNotification(
            {
                uid: 'internet check internet failure',
                level: 'error',
                title: 'Check Internet Error',
                message: 'Error while either pinging google or retrieving the machines IP',
                position: 'tr',
                autoDismiss: 0,
                children: (
                    <div>
                        <h6>Error Message</h6>
                        <a>{params.message}</a>
                    </div>
                )
            }
        );
    }

    onRestartNotify() {
        this.notificationSystem.addNotification(
            {
                uid: 'internet restart modem notification',
                level: 'info',
                title: 'Restart Modem Notification',
                message: 'Restarting the modem can take around ~20 seconds, please wait...',
                position: 'tr',
                autoDismiss: 30
            }
        );
    }

    onRestartSuccess(params) {
        this.notificationSystem.removeNotification('internet restart modem notification');

        this.notificationSystem.addNotification(
            {
                uid: 'internet restart modem success',
                level: 'success',
                title: 'Restart Modem Success',
                message: 'Modem successfully restarted',
                position: 'tr',
                autoDismiss: 5
            }
        );
    }

    onRestartFailure(params) {
        this.notificationSystem.removeNotification('internet restart modem notification');

        this.notificationSystem.addNotification(
            {
                uid: 'internet restart modem failure',
                level: 'error',
                title: 'Restart Modem Error',
                message: 'Error while restarting the Modem',
                position: 'tr',
                autoDismiss: 0,
                children: (
                    <div>
                        <h6>Error Message</h6>
                        <a>{params.message}</a>
                    </div>
                )
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
                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.checkInternet(this.onCheckSuccess, this.onCheckFailure)}>
                                Check Internet Connection
                            </Button>
                            <div className='divider' />

                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.restartModem(this.onRestartNotify, this.onRestartSuccess, this.onRestartFailure)}>
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
