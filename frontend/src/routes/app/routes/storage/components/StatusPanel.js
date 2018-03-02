import React from 'react';

class StatusPanel extends React.Component {
    render() {
        return (
            <div className="box box-default no-breadcrumbs">
                <div className="box-body">
                    <div className="row">
                        <div className="box box-transparent">
                            <div className="box-body">
                                <div className="row text-center metrics">
                                    <div className="col-xs-6 col-md-3 metric-box">
                                        <span className="metric">4</span>
                                        <span className="metric-info">Total Connected Drives</span>
                                    </div>
                                    <div className="col-xs-6 col-md-3 metric-box">
                                        <span className="metric">2</span>
                                        <span className="metric-info">Offline Drives</span>
                                    </div>
                                    <div className="col-xs-6 col-md-3 metric-box">
                                        <span className="metric">1</span>
                                        <span className="metric-info">Powered On Drive</span>
                                    </div>
                                    <div className="col-xs-6 col-md-3 metric-box">
                                        <span className="metric">1</span>
                                        <span className="metric-info">Mounted Drive</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = StatusPanel;
