import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import { checkVPN, restartVPN } from '../../../../actions/api';

const minWidthStyle = {
    minWidth: '135px'
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkVPN,
        restartVPN
    }, dispatch);
}

@connect(null, mapDispatchToProps)
class VPN extends React.Component {
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
                uid: 'vpn check vpn success',
                level: 'success',
                title: 'Check VPN Success',
                message: `VPN IP: ${params.data.vpnIP}`,
                position: 'tr',
                autoDismiss: 5
            }
        );
    }

    onCheckFailure(params) {
        this.notificationSystem.addNotification(
            {
                uid: 'vpn check vpn failure',
                level: 'error',
                title: 'Check VPN Error',
                message: 'Error while either pinging the VPN address or retrieving the VPN IP',
                position: 'tr',
                autoDismiss: 0,
                /*children: (
                    <div>
                        <h6>Error Message</h6>
                        <a>{params.cmd}</a>
                    </div>
                )*/
            }
        );
    }

    onRestartNotify() {
        this.notificationSystem.addNotification(
            {
                uid: 'vpn restart vpn notification',
                level: 'info',
                title: 'Restart VPN Notification',
                message: 'Restarting the VPN can take around ~10 seconds, please wait...',
                position: 'tr',
                autoDismiss: 20
            }
        );
    }

    onRestartSuccess(params) {
        this.notificationSystem.removeNotification('vpn restart vpn notification');

        this.notificationSystem.addNotification(
            {
                uid: 'vpn restart vpn success',
                level: 'success',
                title: 'Restart VPN Success',
                message: 'VPN successfully restarted',
                position: 'tr',
                autoDismiss: 5
            }
        );
    }

    onRestartFailure(params) {
        this.notificationSystem.removeNotification('vpn restart vpn notification');

        //const exception = Object.keys(params).map(key => <a>{key}: {params[key]}</a>);

        this.notificationSystem.addNotification(
            {
                uid: 'vpn restart vpn failure',
                level: 'error',
                title: 'Restart VPN Error',
                message: 'Error while restarting the VPN',
                position: 'tr',
                autoDismiss: 0,
                /*children: (
                    <div>
                        <h6>Error Output</h6>
                        <a>{params.output}</a>
                    </div>
                )*/
            }
        );
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-default'>
                        <div className='box-header'>VPN</div>
                        <div className='box-body text-center'>
                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.checkVPN(this.onCheckSuccess, this.onCheckFailure)}>
                                Check VPN
                            </Button>
                            <div className='divider' />

                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.restartVPN(this.onRestartNotify, this.onRestartSuccess, this.onRestartFailure)}>
                                Restart VPN
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

export default VPN;
