import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

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

class StatusPanel extends React.Component {
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
