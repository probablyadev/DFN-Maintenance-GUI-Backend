import React from 'react';
import Button from 'material-ui/Button';

const minWidthStyle = {
    minWidth: '135px'
};

class Internet extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xl-12">

                    <div className="box box-default">
                        <div className="box-header">Internet</div>
                        <div className="box-body text-center">
                            <Button
                                variant="raised"
                                style={minWidthStyle}
                                label="Check Internet Connection"
                                primary/>
                            <div className="divider"/>

                            <Button
                                variant="raised"
                                style={minWidthStyle}
                                label="Restart Modem"
                                primary/>
                            <div className="divider"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

module.exports = Internet;
