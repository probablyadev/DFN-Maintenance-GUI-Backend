import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const data = [{
  value: 350,
  name: 'Display',
}, {
  value: 560,
  name: 'Social'
}, {
  value: 980,
  name: 'Direct'
}, {
  value: 760,
  name: 'Search'
}, {
  value: 320,
  name: 'Referrals'
}];

const pie = {};
pie.options = {
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    show: false,
    orient: 'vertical',
    x: 'right',
    data: ['Display', 'Social', 'Direct', 'Search', 'Referrals'],
  },
  series: [{
    type: 'pie',
    selectedMode: 'single',
    radius: ['40%', '52%'],
    color: [
      '#EFE04C',
      '#69D361',
      '#47DAB5',
      '#4AC3D6',
      '#5EA1DA',
    ],
    label: {
      normal: {
        position: 'outside',
        formatter: '{b}',
        textStyle: {
          fontSize: 12
        }
      }
    },
    labelLine: {
      normal: {
        show: true
      }
    },
    data,
    markPint: {
      symbol: 'diamond',
      data: [{symbol: 'diamond', }]
    }
  }]
};

const Chart = () => (
  <ReactEcharts style={{height: '400px'}} option={pie.options} showLoading={false} />
);

module.exports = Chart;
