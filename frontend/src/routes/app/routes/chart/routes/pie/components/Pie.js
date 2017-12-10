import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const pie1 = {};
const pie2 = {};
const pie4 = {};

pie1.options = {
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
pie2.options = {
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
      name: 'Traffic source',
      type: 'pie',
      radius: ['50%', '70%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      },
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
pie4.options = {
  title: {
    text: 'Nightingale rose diagram',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
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
      name: 'Radius model',
      type: 'pie',
      radius: [20, 110],
      center: ['25%', 200],
      roseType: 'radius',
      width: '40%',       // for funnel
      max: 40,            // for funnel
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        }
      },
      data: [
        {value: 10, name: 'rose1'},
        {value: 5, name: 'rose2'},
        {value: 15, name: 'rose3'},
        {value: 25, name: 'rose4'},
        {value: 20, name: 'rose5'},
        {value: 35, name: 'rose6'},
        {value: 30, name: 'rose7'},
        {value: 40, name: 'rose8'}
      ]
    },
    {
      name: 'Area model',
      type: 'pie',
      radius: [30, 110],
      center: ['75%', 200],
      roseType: 'area',
      x: '50%',               // for funnel
      max: 40,                // for funnel
      sort: 'ascending',     // for funnel
      data: [
        {value: 10, name: 'rose1'},
        {value: 5, name: 'rose2'},
        {value: 15, name: 'rose3'},
        {value: 25, name: 'rose4'},
        {value: 20, name: 'rose5'},
        {value: 35, name: 'rose6'},
        {value: 30, name: 'rose7'},
        {value: 40, name: 'rose8'}
      ]
    }
  ]

};

const Pie = () => (
  <div className="container-fluid no-breadcrumbs">

    <div className="row">
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Basic Pie</div>
          <div className="box-body">
            <ReactEcharts option={pie1.options} showLoading={false} />
          </div>
        </div>

      </div>
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Doughnut</div>
          <div className="box-body">
            <ReactEcharts option={pie2.options} showLoading={false} />
          </div>
        </div>

      </div>
    </div>

    <div className="row">
      <div className="col-xl-12">

        <div className="box box-default">
          <div className="box-heading">Nightingale's Rose Diagram</div>
          <div className="box-body">
            <ReactEcharts option={pie4.options} showLoading={false} />
          </div>
        </div>

      </div>
    </div>

  </div>
);

module.exports = Pie;
