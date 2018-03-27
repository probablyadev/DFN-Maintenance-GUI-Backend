import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {outputTimeSelector} from '../../../../../selectors/api';
import {outputTime} from '../../../../../actions/api';

function mapStateToProps(state) {
    return {
        time: outputTimeSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({outputTime}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class StatusPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.outputTime();
    }

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
                                            <span className="metric">{this.props.time}</span>
                                            <span className="metric-info">Current Time</span>
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
