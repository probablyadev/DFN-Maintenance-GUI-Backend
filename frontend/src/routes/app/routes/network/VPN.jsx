import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import { checkVPN, restartVPN } from '../../../../actions/api';
import { checkVPNSelector, restartVPNSelector } from '../../../../selectors/api';

const minWidthStyle = {
    minWidth: '135px'
};

function mapStateToProps(state) {
    return {
        checkVPN: checkVPNSelector(state),
        restartVPN: restartVPNSelector(state)
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
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-default'>
                        <div className='box-header'>VPN</div>
                        <div className='box-body text-center'>
                            <Button
                                variant='raised'
                                style={minWidthStyle}
                                primary
                            >
                                Check VPN
                            </Button>
                            <div className='divider' />

                            <Button
                                variant='raised'
                                style={minWidthStyle}
                                primary
                            >
                                Restart VPN
                            </Button>
                            <div className='divider' />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default VPN;
