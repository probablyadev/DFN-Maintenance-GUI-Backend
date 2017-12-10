import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

//
class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Simple dialog</div>
          <div className="box-body">
            <RaisedButton label="Dialog" onClick={this.handleOpen} />
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              The actions in this window were passed in as an array of React objects.
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}


//
class DialogExampleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Modal dialog</div>
          <div className="box-body">
            <RaisedButton label="Modal Dialog" onClick={this.handleOpen} />
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal
              open={this.state.open}
              >
                Only actions can close this dialog.
              </Dialog>
          </div>
        </div>
      </div>
    );
  }
}


//
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class DialogExampleCustomWidth extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Styled dialog</div>
          <div className="box-body">
            <RaisedButton label="Dialog With Custom Width" onClick={this.handleOpen} />
            <Dialog
              title="Dialog With Custom Width"
              actions={actions}
              modal
              contentStyle={customContentStyle}
              open={this.state.open}
              >
                This dialog spans the entire width of the screen.
              </Dialog>
          </div>
        </div>
      </div>
    );
  }
}


//
class DialogExampleDialogDatePicker extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Nested dialogs</div>
          <div className="box-body">
            <RaisedButton label="Dialog With Date Picker" onClick={this.handleOpen} />
            <Dialog
              title="Dialog With Date Picker"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Open a Date Picker dialog from within a dialog.
              <DatePicker hintText="Date Picker" />
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}


//
const styles = {
  radioButton: {
    marginTop: 16,
  },
};

class DialogExampleScrollable extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    const radios = [];
    for (let i = 0; i < 30; i++) {
      radios.push(
        <RadioButton
          key={i}
          value={`value${i + 1}`}
          label={`Option ${i + 1}`}
          style={styles.radioButton}
        />
      );
    }

    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Scrollable dialog</div>
          <div className="box-body">
            <RaisedButton label="Scrollable Dialog" onClick={this.handleOpen} />
            <Dialog
              title="Scrollable Dialog"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                {radios}
              </RadioButtonGroup>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}


//
class DialogExampleAlert extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Alert dialog</div>
          <div className="box-body">
            <RaisedButton label="Alert" onClick={this.handleOpen} />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Discard draft?
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}


const DialogSection = () => (
  <article className="article">
    <h2 className="article-title">Material Dialog</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <DialogExampleSimple />
            <DialogExampleModal />
          </div>

          <div className="divider divider-lg divider-dashed" />
          <div className="row">
            <DialogExampleCustomWidth />
            <DialogExampleDialogDatePicker />
          </div>

          <div className="divider divider-lg divider-dashed" />
          <div className="row">
            <DialogExampleScrollable />
            <DialogExampleAlert />
          </div>

        </div>
      </div>
    </section>
  </article>
);

module.exports = DialogSection;
