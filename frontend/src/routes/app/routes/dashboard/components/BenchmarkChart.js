import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const radar = {};
radar.options = {
  legend: {
    orient: 'vertical',
    x: 'right',
    y: 'bottom',
    data: ['Industry Average', 'Our Company'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: false,
  },
  radar: [
    {
      axisLine: {
        show: true,
        lineStyle: {
                    // for both indicator and axisLine, bad, better seperate them
          color: '#b1b1b1'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,.1)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      },
      indicator: [
        { name: 'Sales', max: 6000},
        { name: 'Administration', max: 16000},
        { name: 'Info Tech', max: 30000},
        { name: 'Customer Support', max: 38000},
        { name: 'Development', max: 52000},
        { name: 'Marketing', max: 25000}
      ]
    }
  ],
  calculable: true,
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Industry Average',
          itemStyle: {
            normal: {
              color: CHARTCONFIG.color.success
            }
          }
        },
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Our Company',
          itemStyle: {
            normal: {
              color: CHARTCONFIG.color.info
            }
          }
        }
      ]
    }
  ]
};


const Chart = () => (
  <ReactEcharts option={radar.options} showLoading={false} />
);

module.exports = Chart;
