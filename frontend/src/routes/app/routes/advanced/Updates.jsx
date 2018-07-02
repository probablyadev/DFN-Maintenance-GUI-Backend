import React from 'react';
import Button from 'material-ui/Button';

const minWidthStyle = {
    minWidth: '135px'
};

const Updates = () => (
    <div className='row'>
        <div className='col-xl-12'>

            <div className='box box-default'>
                <div className='box-header'>Updates</div>
                <div className='box-body text-center'>
                    <Button
                        variant='raised'
                        style={minWidthStyle}
                    >
                        Update Leostick Firmware
                    </Button>
                    <div className='divider' />

                    <Button
                        variant='raised'
                        style={minWidthStyle}
                    >
                        Update Python Software
                    </Button>
                    <div className='divider' />
                </div>
            </div>

        </div>
    </div>
);

export default Updates;
