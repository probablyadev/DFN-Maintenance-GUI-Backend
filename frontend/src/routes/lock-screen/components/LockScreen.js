import React from 'react';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';

class LockScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      user: APPCONFIG.user
    };
  }

  render() {
    return (
      <div className="lock-container">
        <section className="lock-box">
          <div className="lock-user">{this.state.user}</div>
          <div className="lock-img"><img src="assets/images/g1.jpg" alt="" /></div>
          <div className="lock-pwd">
            <form>
              <div className="form-group">
                <input type="password" placeholder="Password" className="form-control" />
                <a href="#/" className="btn-submit">
                  <i className="material-icons">keyboard_arrow_right</i>
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const Page = () => (
  <div className="page-lock">
    <div className="lock-centered clearfix">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <LockScreen />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
