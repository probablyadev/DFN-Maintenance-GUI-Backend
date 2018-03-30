import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';

import PowerDialog from './PowerDialog';
import MountDialog from './MountDialog';

const StyledPowerDialog = styled(PowerDialog)`
    margin-left: 2em;
    margin-right: 2em;
`;

const StyledMountDialog = styled(MountDialog)`
    margin-left: 2em;
    margin-right: 2em;
`;

const StyledRaisedButton = styled(Button)`
    margin-left: 2em;
    margin-right: 2em;
`;

class Actions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xl-12'>

                    <div className='box box-default'>
                        <div className='box-header'>Actions</div>
                        <div className='box-body'>
                            <div className='row'>
                                <StyledPowerDialog className='col-xs-4' />
                                <StyledMountDialog className='col-xs-4' />
                                <StyledRaisedButton
                                    variant='raised'
                                    className='col-xs-4'
                                    label='Format Drives'
                                />
                                <StyledRaisedButton
                                    variant='raised'
                                    className='col-xs-4'
                                    label='Transfer /data0'
                                />
                                <StyledRaisedButton
                                    variant='raised'
                                    className='col-xs-4'
                                    label='Run Smart Test'
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Actions;
