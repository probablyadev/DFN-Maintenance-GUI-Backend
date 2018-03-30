import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import { checkInternet, restartModem } from '../../../../actions/api';
import { checkInternetSelector, restartModemSelector } from '../../../../selectors/api';

const minWidthStyle = {
    minWidth: '135px'
};

function mapStateToProps(state) {
    return {
        checkInternet: checkInternetSelector(state),
        restartModem: restartModemSelector(state)
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
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-default'>
                        <div className='box-header'>Internet</div>
                        <div className='box-body text-center'>
                            <Button
                                variant='raised'
                                style={minWidthStyle}
                                label='Check Internet Connection'
                                primary
                            />
                            <div className='divider' />

                            <Button
                                variant='raised'
                                style={minWidthStyle}
                                label='Restart Modem'
                                primary
                            />
                            <div className='divider' />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Internet;
