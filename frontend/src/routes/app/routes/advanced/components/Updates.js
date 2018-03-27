import React from 'react';
import Button from 'material-ui/Button';

const minWidthStyle = {
    minWidth: '135px'
};

class Updates extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xl-12">

                    <div className="box box-default">
                        <div className="box-header">Updates</div>
                        <div className="box-body text-center">
                            <Button
                                variant="raised"
                                style={minWidthStyle}
                            >
                                Update Leostick Firmware
                            </Button>
                            <div className="divider"/>

                            <Button
                                variant="raised"
                                style={minWidthStyle}
                            >
                                Update Python Software
                            </Button>
                            <div className="divider"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

module.exports = Updates;
