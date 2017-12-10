import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';

class Hero extends React.Component {

  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  render() {
    return (
      <article className="article">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Careers at {this.state.brand}</h1>
          </div>
          <p className="hero-tagline">We’re a small startup, so everyone has a huge impact.</p>
          <div className="hero-action">
            <RaisedButton label="View Openings" />
          </div>
        </section>
      </article>
    );
  }
}

const Why = () => (
  <article className="article">
    <h2 className="article-title text-center no-margin-top">Why working here</h2>

    <div className="row">
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">devices</i></a>
          </div>
          <h3>Your own laptop</h3>
          <p>Choose the laptop you want, normally it's a Macbook air or Macbook Pro.</p>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">access_time</i></a>
          </div>
          <h3>Flexible work hours</h3>
          <p>Choose hours that work well for you and your life. We’re not all 9 to 5 here.</p>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">directions_bike</i></a>
          </div>
          <h3>A new bike</h3>
          <p>Getting around San Francisco is the best way to see the city all year round.</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">attach_money</i></a>
          </div>
          <h3>Competitive Compensation</h3>
          <p>We offer salaries and equity that compete with any tech company in the city.</p>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">local_hospital</i></a>
          </div>
          <h3>Healthcare Coverage</h3>
          <p>Have access to the best health coverage so you know you and your family are covered.</p>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">people_outline</i></a>
          </div>
          <h3>Friendly colleague</h3>
          <p>All your colleague are friendly, you'll have fun working here.</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">card_giftcard</i></a>
          </div>
          <h3>Monthly gift</h3>
          <p>We will have a monthly gift for everyone, and more surprise coming on the way.</p>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">autorenew</i></a>
          </div>
          <h3>Free Gym Membership</h3>
          <p>Our office is near a gym and you can walk there whenever you want.</p>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="icon-box ibox-plain">
          <div className="ibox-icon">
            <a href="javascript:;"><i className="material-icons">favorite_border</i></a>
          </div>
          <h3>A Watsi Donation</h3>
          <p>Each employee receives a Watsi donation to help improve someones life.</p>
        </div>
      </div>
    </div>

  </article>
);

const Page = () => (
  <section className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Hero /></div>
      <div key="2"><Why /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
