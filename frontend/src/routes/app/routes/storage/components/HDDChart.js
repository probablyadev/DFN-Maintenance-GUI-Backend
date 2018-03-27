import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';
import {checkHDD} from '../../../../../actions/api';
import {checkHDDSelector} from '../../../../../selectors/api';

const pieStatus = {};
const pieSpace = {};

pieStatus.options = {
    title: {
        text: 'HDD Status',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        y: 'center',
        data: ['Off', 'On', 'Mounted'],
        textStyle: {
            color: CHARTCONFIG.color.text
        }
    },
    calculable: true,
    series: [
        {
            name: 'Visit source',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 1, name: 'Off'},
                {value: 1, name: 'On'},
                {value: 3, name: 'Mounted'}
            ]
        }
    ]
};

pieSpace.options = {
    title: {
        text: 'HDD Space',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        y: 'center',
        data: ['Used', 'Available'],
        textStyle: {
            color: CHARTCONFIG.color.text
        }
    },
    calculable: true,
    series: [
        {
            name: 'Visit source',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 2, name: 'Used'},
                {value: 5, name: 'Available'},
            ]
        }
    ]
};

function mapStateToProps(state) {
    return {
        hdd: checkHDDSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({checkHDD}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class StatusPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkHDD();
    }

    render() {
        return (
            <div className="row">
                <div className="col-xl-6">
                    <div className="box box-default box-body">
                        <ReactEcharts option={pieStatus.options} showLoading={false}/>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="box box-default box-body">
                        <ReactEcharts option={pieSpace.options} showLoading={false}/>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = StatusPanel;
