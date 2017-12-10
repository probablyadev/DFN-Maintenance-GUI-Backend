import React from 'react';
import QueueAnim from 'rc-queue-anim';

const PricingTables = () => (
  <div>
    <div className="divider divider-lg" />
    <div className="row">
      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-primary">
          <header><h2>Free</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>0.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>No Support</li>
              <li>1 Website</li>
              <li>10GB Disk Space</li>
              <li>3 Database</li>
              <li>1 Email Address</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-primary">Buy now</a></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-success">
          <header><h2>Basic</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>29.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>1 Website</li>
              <li>100GB Disk Space</li>
              <li>10 Database</li>
              <li>10 Email Address</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-success">Get it now</a></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-warning">
          <header> <h2>Standard</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>39.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Website</li>
              <li>500GB Disk Space</li>
              <li>25 Database</li>
              <li>50 Email Address</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-warning">Get it now</a></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-danger">
          <header> <h2>Ultimate</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>99.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Website</li>
              <li>Unlimited Disk Space</li>
              <li>Unlimited Database</li>
              <li>100 Email Address</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-danger">Get it now</a></footer>
        </section>
      </div>
    </div>

    <div className="row">
      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table pricing-table-info">
          <header><h2>Basic</h2></header>
          <p className="pricing-price"><span className="pricing-sign">$</span>29.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>1 Website</li>
              <li>100GB Disk Space</li>
              <li>10 Database</li>
              <li>10 Email Address</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-info">Get it now</a></footer>
        </section>
      </div>

      <div className="col-md-3 col-xsm-6">
        <section className="pricing-table">
          <header> <h2>Standard</h2> </header>
          <p className="pricing-price"><span className="pricing-sign">$</span>39.00<span className="pricing-sub">/mo</span></p>
          <div className="pricing-plan-details">
            <p className="pricing-lead">Including</p>
            <ul>
              <li>24/7 Support</li>
              <li>Unlimited Website</li>
              <li>500GB Disk Space</li>
              <li>25 Database</li>
              <li>50 Email Address</li>
            </ul>
          </div>
          <footer><a href="javascript:;" className="btn btn-default">Get it now</a></footer>
        </section>
      </div>
    </div>
  </div>
);

const Page = () => (
  <section className="container-fluid no-breadcrumbs chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><PricingTables /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
