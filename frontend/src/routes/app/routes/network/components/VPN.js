import React from 'react';
import Button from 'material-ui/Button';

const minWidthStyle = {
    minWidth: '135px'
};

class VPN extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xl-12">

                    <div className="box box-default">
                        <div className="box-header">VPN</div>
                        <div className="box-body text-center">
                            <Button
                                variant="raised"
                                style={minWidthStyle}
                                label="Check VPN"
                                primary/>
                            <div className="divider"/>

                            <Button
                                variant="raised"
                                style={minWidthStyle}
                                label="Restart VPN"
                                primary/>
                            <div className="divider"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

module.exports = VPN;
