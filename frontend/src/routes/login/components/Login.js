import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

class Login extends React.Component {
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

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    fullWidth
                    />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/" className="color-primary">Login</a>
          </div>
        </div>

        <div className="additional-info">
          <a href="#/sign-up">Sign up</a>
          <span className="divider-h" />
          <a href="#/forgot-password">Forgot your password?</a>
        </div>

      </div>
    );
  }
}

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <Login />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
