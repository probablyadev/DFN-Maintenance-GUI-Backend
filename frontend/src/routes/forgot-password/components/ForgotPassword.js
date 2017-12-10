import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

class ForgotPassowrd extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>
            <form>
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    type="email"
                    fullWidth
                  />
                  <div className="additional-info text-center text-small">
                    Enter your email address that you used to register. We'll send you an email with your username and a link to reset your password.
                 </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/" className="color-primary">Reset</a>
          </div>
        </div>
      </div>
    );
  }
}

const Page = () => (
  <div className="page-forgot">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <ForgotPassowrd />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;

