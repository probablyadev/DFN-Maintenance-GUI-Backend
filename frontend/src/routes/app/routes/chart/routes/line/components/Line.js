import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const line1 = {};
const line2 = {};
const line3 = {};
const line4 = {};

line1.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Highest temperature', 'Lowest temperature'],
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
      boundaryGap: false,
      data: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
      axisLabel: {
        formatter: '{value} °C',
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
        formatter: '{value} °C',
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
      name: 'Highest temperature',
      type: 'line',
      data: [11, 11, 15, 13, 12, 13, 10],
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
      name: 'Lowest temperature',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [
                    {name: 'Lowest temperature', value: -2, xAxis: 1, yAxis: -1.5}
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
line2.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Affiliate', 'Video Ads', 'Direct', 'Search'],
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
      boundaryGap: false,
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
      name: 'Email',
      type: 'line',
      stack: 'Sum',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate',
      type: 'line',
      stack: 'Sum',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Sum',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Sum',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search',
      type: 'line',
      stack: 'Sum',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
line3.options = {
  title: {
    text: 'Sales',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Intention', 'Pre-order', 'Deal closed'],
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
      boundaryGap: false,
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
      name: 'Deal closed',
      type: 'line',
      smooth: true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [10, 12, 21, 54, 260, 830, 710]
    },
    {
      name: 'Pre-order',
      type: 'line',
      smooth: true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [30, 182, 434, 791, 390, 30, 10]
    },
    {
      name: 'Intention',
      type: 'line',
      smooth: true,
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [1320, 1132, 601, 234, 120, 90, 20]
    }
  ]
};
line4.options = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Affiliate', 'Video Ads', 'Direct', 'Search'],
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
      boundaryGap: false,
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
      name: 'Email',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search',
      type: 'line',
      stack: 'Sum',
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};


const Line = () => (
  <div className="container-fluid no-breadcrumbs">

    <div className="row">
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Base Line</div>
          <div className="box-body">
            <ReactEcharts option={line1.options} showLoading={false} />
          </div>
        </div>

      </div>
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Stacked Line</div>
          <div className="box-body">
            <ReactEcharts option={line2.options} showLoading={false} />
          </div>
        </div>

      </div>
    </div>


    <div className="row">
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Base Area</div>
          <div className="box-body">
            <ReactEcharts option={line3.options} showLoading={false} />
          </div>
        </div>

      </div>
      <div className="col-xl-6">

        <div className="box box-default">
          <div className="box-heading">Stacked Area</div>
          <div className="box-body">
            <ReactEcharts option={line4.options} showLoading={false} />
          </div>
        </div>

      </div>
    </div>

  </div>
);

module.exports = Line;
