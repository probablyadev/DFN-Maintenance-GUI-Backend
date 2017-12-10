import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';

//
class SnackbarExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Simple examples</div>
          <div className="box-body">
            <RaisedButton
              onClick={this.handleTouchTap}
              label="Add to my calendar"
            />
            <Snackbar
              open={this.state.open}
              message="Event added to your calendar"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

//
class SnackbarExampleAction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 4000,
      message: 'Event added to your calendar',
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
    alert('Event removed from your calendar.');
  };

  handleChangeDuration = (event) => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value, 10) : 0,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Example action</div>
          <div className="box-body">
            <RaisedButton
              onClick={this.handleTouchTap}
              label="Add to my calendar"
            />
            <br />
            <TextField
              floatingLabelText="Auto Hide Duration in ms"
              value={this.state.autoHideDuration}
              onChange={this.handleChangeDuration}
            />
            <Snackbar
              open={this.state.open}
              message={this.state.message}
              action="undo"
              autoHideDuration={this.state.autoHideDuration}
              onActionTouchTap={this.handleActionTouchTap}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

const SnackbarSection = () => (
  <article className="article">
    <h2 className="article-title">Material Snackbar</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <SnackbarExampleSimple />
            <SnackbarExampleAction />
          </div>
          <div className="callout callout-warning">
            <p>Snackbars provide lightweight feedback about an operation by showing a brief message at the <strong>bottom of the screen</strong>. Snackbars can contain an action.</p>
          </div>

        </div>
      </div>
    </section>
  </article>
);

module.exports = SnackbarSection;
