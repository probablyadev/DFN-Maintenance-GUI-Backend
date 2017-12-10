import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

class SignUp extends React.Component {
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
                    floatingLabelText="Username"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    type="email"
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
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clicking on sign up, you agree to <a href="javascript:;"><i>terms</i></a> and <a href="javascript:;"><i>privacy policy</i></a></p>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/login" className="color-gray-light">Login</a>
            <a href="#/" className="color-primary">Sign Up</a>
          </div>
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
          <SignUp />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
