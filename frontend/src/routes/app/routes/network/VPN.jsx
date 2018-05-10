import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import { checkVPN, restartVPN } from '../../../../actions/api';
import { checkVPNSelector, restartVPNSelector } from '../../../../selectors/api';

const minWidthStyle = {
    minWidth: '135px'
};

function mapStateToProps(state) {
    return {
        checkVPNData: checkVPNSelector(state).data,
        checkVPNError: checkVPNSelector(state).error,
        restartVPNData: restartVPNSelector(state).data,
        restartVPNError: restartVPNSelector(state).error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkVPN,
        restartVPN
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class VPN extends React.Component {
    constructor(props) {
        super(props);

        this.notificationSystem = null;

        // TODO: Add a button for viewing the full ping output.
        this.notifications = [
            {
                uid: 'internet check vpn success',
                level: 'success',
                title: 'Check VPN Success',
                message: 'VPN IP: {0}',
                position: 'tr',
                autoDismiss: 5
            },
            {
                uid: 'internet check vpn failure',
                level: 'error',
                title: 'Check VPN Error',
                message: 'Error while either pinging the VPN address or retrieving the VPN IP',
                position: 'tr',
                autoDismiss: 5
            },
            {
                uid: 'internet restart vpn success',
                level: 'success',
                title: 'Restart VPN Success',
                message: 'VPN successfully restarted',
                position: 'tr',
                autoDismiss: 5
            },
            {
                uid: 'internet restart vpn failure',
                level: 'error',
                title: 'Restart VPN Error',
                message: 'Error while restarting the VPN',
                position: 'tr',
                autoDismiss: 5
            }
        ];

        this.processNotifications = this.processNotifications.bind(this);
    }

    componentDidMount() {
        // Grab a reference to the notification system object in render().
        this.notificationSystem = this.refs.notificationSystem;
    }

    processNotifications() {
        if (this.notificationSystem != null) {
            if (!this.props.checkVPNError && this.props.checkVPNData !== null) {
                this.notificationSystem.addNotification(this.notifications[0]);
            } else {
                this.notificationSystem.addNotification(this.notifications[1]);
            }

            if (!this.props.restartVPNError && this.props.restartVPNData !== null) {
                this.notificationSystem.addNotification(this.notifications[2]);
            } else {
                this.notificationSystem.addNotification(this.notifications[3]);
            }
        }
    }

    render() {
        this.processNotifications();

        return (
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-default'>
                        <div className='box-header'>VPN</div>
                        <div className='box-body text-center'>
                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.checkVPN()}>
                                Check VPN
                            </Button>
                            <div className='divider' />

                            <Button variant='raised' style={minWidthStyle} onClick={() => this.props.restartVPN()}>
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
