import React from 'react';

const minWidthStyle = {
  minWidth: '135px'
};

class Config extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xl-12">

                    <div className="box box-default">
                        <div className="box-header">Config</div>
                        <div className="box-body text-center">
                            <RaisedButton style={minWidthStyle} label="Edit Config File" primary/>
                            <div className="divider"/>
                            <RaisedButton style={minWidthStyle} label="Check /latest Logs" primary/>
                            <div className="divider"/>
                            <RaisedButton style={minWidthStyle} label="Check Second /latest Logs" primary/>
                            <div className="divider"/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

module.exports = Config;
