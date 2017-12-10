import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const Statboxes = () => (
  <div className="row">
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>35<span className="size-h5">%</span></span>
        </div>
        <div className="box-info">
          <span>Growth</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-success">airplanemode_active</i>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>42<span className="size-h5">%</span></span>
        </div>
        <div className="box-info">
          <span>New Users</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-info">supervisor_account</i>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>37<span className="size-h5">k</span></span>
        </div>
        <div className="box-info">
          <span>Profit</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-warning">attach_money</i>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="box box-default">
        <div className="box-top">
          <span>25<span className="size-h5">k</span></span>
        </div>
        <div className="box-info">
          <span>Sales</span>
        </div>
        <div className="box-bottom">
          <i className="material-icons color-danger">shopping_cart</i>
        </div>
      </div>
    </div>
  </div>
);

module.exports = Statboxes;
