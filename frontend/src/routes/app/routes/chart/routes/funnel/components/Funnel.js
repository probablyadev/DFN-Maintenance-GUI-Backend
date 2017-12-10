import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const funnel1 = {};
const funnel2 = {};
const funnel3 = {};


funnel1.options = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  legend: {
    data: ['Dispaly', 'Click', 'Visit', 'Question', 'Order'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  calculable: true,
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      x: '10%',
      y: 60,
            // x2: 80,
      y2: 60,
      width: '80%',
            // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending', // 'ascending', 'descending'
      gap: 10,
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            show: false,
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            formatter: '{b}:{c}%'
          },
          labelLine: {
            show: true
          }
        }
      },
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Dispaly'}
      ]
    }
  ]
};
funnel2.options = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  legend: {
    data: ['Display', 'Click', 'Visit', 'Question', 'Order'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  series: [
    {
      name: 'Forecast',
      type: 'funnel',
      left: '10%',
      width: '80%',
      label: {
        normal: {
          formatter: '{b} Forecast'
        },
        emphasis: {
          position: 'inside',
          formatter: '{b} Forecast: {c}%'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          opacity: 0.7
        }
      },
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Display'}
      ]
    },
    {
      name: 'Reality',
      type: 'funnel',
      left: '10%',
      width: '80%',
      maxSize: '80%',
      label: {
        normal: {
          position: 'inside',
          formatter: '{c}%',
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          position: 'inside',
          formatter: '{b} Reality: {c}%'
        }
      },
      itemStyle: {
        normal: {
          opacity: 0.5,
          borderColor: '#fff',
          borderWidth: 2
        }
      },
      data: [
        {value: 30, name: 'Visit'},
        {value: 10, name: 'Ask'},
        {value: 5, name: 'Order'},
        {value: 50, name: 'Click'},
        {value: 80, name: 'Display'}
      ]
    }
  ]
};
funnel3.options = {
  title: {
    text: 'Funnel',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {show: true, title: 'save'}
    }
  },
  legend: {
    data: ['Dispaly', 'Click', 'Visit', 'Question', 'Order'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  calculable: true,
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Dispaly'}
      ]
    },
    {
      name: 'Pyramid',
      type: 'funnel',
      x: '50%',
      sort: 'ascending',
      itemStyle: {
        normal: {
          label: {
            position: 'left'
          }
        }
      },
      data: [
        {value: 60, name: 'Visit'},
        {value: 40, name: 'Question'},
        {value: 20, name: 'Order'},
        {value: 80, name: 'Click'},
        {value: 100, name: 'Dispaly'}
      ]
    }
  ]
};

const Funnel = () => (
  <div className="container-fluid no-breadcrumbs">

    <div className="row">
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Basic Funnel</div>
          <div className="box-body">
            <ReactEcharts option={funnel1.options} showLoading={false} />
          </div>
        </div>

      </div>
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Multiple Funnel</div>
          <div className="box-body">
            <ReactEcharts option={funnel2.options} showLoading={false} />
          </div>
        </div>

      </div>
    </div>


    <div className="box box-default">
      <div className="box-heading">Funnels</div>
      <div className="box-body">
        <ReactEcharts option={funnel3.options} showLoading={false} />
      </div>
    </div>

  </div>
);

module.exports = Funnel;
