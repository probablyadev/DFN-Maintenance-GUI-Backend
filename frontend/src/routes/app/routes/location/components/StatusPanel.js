import React from 'react';

class StatusPanel extends React.Component {
    render() {
        return (
            <div className="box box-default">
                <div className="box-body">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="box box-transparent">
                                <div className="box-header">Status Panel</div>
                                <div className="box-body">
                                    <div className="row text-center metrics">
                                        <div className="col-xs-6 col-md-6 metric-box">
                                            <span className="metric">192.444N, 139.222E</span>
                                            <span className="metric-info">Location</span>
                                        </div>
                                        <div className="col-xs-6 col-md-6 metric-box">
                                            <span className="metric">(GMT+08:00) Western Time - Perth: Australia/Perth</span>
                                            <span className="metric-info">TimeZone</span>
                                        </div>
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
