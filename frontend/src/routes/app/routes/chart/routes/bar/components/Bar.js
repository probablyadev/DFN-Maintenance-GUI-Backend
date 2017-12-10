import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const bar1 = {};
const bar2 = {};
const bar3 = {};
const bar4 = {};
const bar5 = {};

bar1.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Evaporation', 'Precipitation'],
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
  xAxis: [
    {
      type: 'category',
      data: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      markPoint: {
        data: [
                    {type: 'max', name: 'Max'},
                    {type: 'min', name: 'Min'}
        ]
      },
      markLine: {
        data: [
                    {type: 'average', name: 'Average'}
        ]
      }
    },
    {
      name: 'Precipitation',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      markPoint: {
        data: [
          {name: 'Highest', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18},
          {name: 'Lowest', value: 2.3, xAxis: 11, yAxis: 3}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: 'Average'}
        ]
      }
    }
  ]
};
bar2.options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Direct', 'Email', 'Affiliate', 'Video Ads', 'Search', 'Baidu', 'Google', 'Bing', 'Others'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ads',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate',
      type: 'bar',
      stack: 'Ads',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Ads',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      markLine: {
        itemStyle: {
          normal: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        data: [
                    [{type: 'min'}, {type: 'max'}]
        ]
      }
    },
    {
      name: 'Baidu',
      type: 'bar',
      barWidth: 5,
      stack: 'Search',
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: 'Google',
      type: 'bar',
      stack: 'Search',
      data: [120, 132, 101, 134, 290, 230, 220]
    },
    {
      name: 'Bing',
      type: 'bar',
      stack: 'Search',
      data: [60, 72, 71, 74, 190, 130, 110]
    },
    {
      name: 'Others',
      type: 'bar',
      stack: 'Search',
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
};
bar3.options = {
  title: {
    text: 'World Population',
    subtext: 'From the Internet'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['2011', '2012'],
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
  xAxis: [
    {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World Population (10k)'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
};
bar4.options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
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
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search',
      type: 'bar',
      stack: 'Sum',
      itemStyle: { normal: {label: {show: true, position: 'insideRight'}}},
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
};
bar5.options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Profit', 'Cost', 'Income'],
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
  xAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {show: false},
      data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text
        }
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      }
    }
  ],
  series: [
    {
      name: 'Profit',
      type: 'bar',
      itemStyle: { normal: {label: {show: true, position: 'inside'}}},
      data: [200, 170, 240, 244, 200, 220, 210]
    },
    {
      name: 'Income',
      type: 'bar',
      stack: 'Sum',
      barWidth: 5,
      itemStyle: {normal: {
        label: {show: true}
      }},
      data: [320, 302, 341, 374, 390, 450, 420]
    },
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Sum',
      itemStyle: {normal: {
        label: {show: true, position: 'left'}
      }},
      data: [-120, -132, -101, -134, -190, -230, -210]
    }
  ]
};

const Section1 = () => (
  <div className="row">
    <div className="col-xl-6">

      <div className="box box-default">
        <div className="box-heading">Basic Column</div>
        <div className="box-body">
          <ReactEcharts option={bar1.options} showLoading={false} />
        </div>
      </div>

    </div>
    <div className="col-xl-6">

      <div className="box box-default">
        <div className="box-heading">Stacked Column</div>
        <div className="box-body">
          <ReactEcharts option={bar2.options} showLoading={false} />
        </div>
      </div>

    </div>
  </div>
);

const Section2 = () => (
  <div className="row">
    <div className="col-xl-6">

      <div className="box box-default">
        <div className="box-heading">Basic Bar</div>
        <div className="box-body">
          <ReactEcharts option={bar3.options} showLoading={false} />
        </div>
      </div>

    </div>
    <div className="col-xl-6">

      <div className="box box-default">
        <div className="box-heading">Stacked Bar</div>
        <div className="box-body">
          <ReactEcharts option={bar4.options} showLoading={false} />
        </div>
      </div>

    </div>
  </div>
);

const Section3 = () => (
  <div className="row">
    <div className="col-xl-12">

      <div className="box box-default">
        <div className="box-heading">Tornado</div>
        <div className="box-body">
          <ReactEcharts option={bar5.options} showLoading={false} />
        </div>
      </div>

    </div>
  </div>
);

const Bar = () => (
  <div className="container-fluid no-breadcrumbs">
    <Section1 />
    <Section2 />
    <Section3 />
  </div>
);

module.exports = Bar;
