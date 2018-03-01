import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const pie = {};

pie.options = {
  title: {
    text: 'Traffic Source',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  calculable: true,
  series: [
    {
      name: 'Vist source',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Affiliate'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search'}
      ]
    }
  ]
};

class StatusPanel extends React.Component {
    render() {
        return (
            <div className="box box-default">
                <div className="box-body">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="box box-transparent">
                                <div className="box-header">Stats</div>
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
                        <div className="col-xl-4">
                            <div className="box box-transparent">
                                <div className="box-header">Breakdown</div>
                                <div className="box-body">
                                    <ReactEcharts option={pie.options} showLoading={false}/>
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
