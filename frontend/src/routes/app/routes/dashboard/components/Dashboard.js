import React from 'react';
import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import AquisitionChart from './AquisitionChart';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';

const Main = () => (
  <div className="row">
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body">
          <KPIsChart />
        </div>
      </div>
    </div>
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body">
          <AquisitionChart />
        </div>
      </div>
    </div>
  </div>
);

const Engagement = () => (
  <div className="box box-default">
    <div className="box-body">
      <div className="row">
        <div className="col-xl-8">
          <div className="box box-transparent">
            <div className="box-header">Engagement</div>
            <div className="box-body">
              <div className="row text-center metrics">
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">2.6M</span>
                  <span className="metric-info">Visits</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">4.5M</span>
                  <span className="metric-info">Users</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">08:03</span>
                  <span className="metric-info">Visit Duration</span>
                </div>
                <div className="col-xs-6 col-md-3 metric-box">
                  <span className="metric">5.25</span>
                  <span className="metric-info">Pages per Visit</span>
                </div>
              </div>

              <EngagementStats />
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="box box-transparent">
            <div className="box-header">Benchmark</div>
            <div className="box-body">
              <BenchmarkChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <Main />
      <div key="2"><StatBoxes /></div>
      <div key="3"><Engagement /></div>
    </QueueAnim>

  </div>
);

module.exports = Dashboard;
