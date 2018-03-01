import React from 'react';

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
                            <RaisedButton style={minWidthStyle} label="Update Leostick Firmware" primary/>
                            <div className="divider"/>
                            <RaisedButton style={minWidthStyle} label="Update Python Software" primary/>
                            <div className="divider"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

module.exports = Updates;
