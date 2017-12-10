import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import RadioButton from 'material-ui/RadioButton';

class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
        // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
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
              label="Click me"
                        />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
                        >
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help &amp; feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" />
              </Menu>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

class PopoverExampleAnimation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
        // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
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
          <div className="box-header">Animation</div>
          <div className="box-body">
            <RaisedButton
              onClick={this.handleTouchTap}
              label="Click me"
                        />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationVertical}
                        >
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help &amp; feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" />
              </Menu>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

//
const styles = {
  h4: {
    fontWeight: 400,
  },
  block: {
    display: 'flex',
  },
  block2: {
    margin: 10,
  },
};
class PopoverExampleConfigurable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };
  }

  handleTouchTap = (event) => {
        // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  setAnchor = (positionElement, position) => {
    const {anchorOrigin} = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin,
    });
  };

  setTarget = (positionElement, position) => {
    const {targetOrigin} = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <RaisedButton
            onClick={this.handleTouchTap}
            label="Click me"
                    />
          <div className="callout callout-info">
            <h4>Current Settings</h4>
            <div className="divider" />
            <p>anchorOrigin: {JSON.stringify(this.state.anchorOrigin)}</p>
            <p>targetOrigin: {JSON.stringify(this.state.targetOrigin)}</p>
          </div>
          <div className="callout callout-success">
            <h4>Position Options</h4>
            <div className="divider" />
            <p>Use the settings to toggle the positioning of the popovers above</p>
          </div>
        </div>
        <div className="col-lg-6">

          <h6>Anchor Origin</h6>
          <div style={styles.block}>
            <div style={styles.block2}>
              <span>Vertical</span>
              <div className="divider" />
              <RadioButton
                onClick={this.setAnchor.bind(this, 'vertical', 'top')}
                label="Top" checked={this.state.anchorOrigin.vertical === 'top'}
              />
              <RadioButton
                onClick={this.setAnchor.bind(this, 'vertical', 'center')}
                label="Center" checked={this.state.anchorOrigin.vertical === 'center'}
              />
              <RadioButton
                onClick={this.setAnchor.bind(this, 'vertical', 'bottom')}
                label="Bottom" checked={this.state.anchorOrigin.vertical === 'bottom'}
              />
            </div>
            <div style={styles.block2}>
              <span>Horizontal</span>
              <div className="divider" />
              <RadioButton
                onClick={this.setAnchor.bind(this, 'horizontal', 'left')}
                label="Left" checked={this.state.anchorOrigin.horizontal === 'left'}
              />
              <RadioButton
                onClick={this.setAnchor.bind(this, 'horizontal', 'middle')}
                label="Middle" checked={this.state.anchorOrigin.horizontal === 'middle'}
              />
              <RadioButton
                onClick={this.setAnchor.bind(this, 'horizontal', 'right')}
                label="Right" checked={this.state.anchorOrigin.horizontal === 'right'}
              />
            </div>
          </div>
          <div className="divider divider-md" />
          <h6>Target Origin</h6>
          <div style={styles.block}>
            <div style={styles.block2}>
              <span>Vertical</span>
              <div className="divider" />
              <RadioButton
                onClick={this.setTarget.bind(this, 'vertical', 'top')}
                label="Top" checked={this.state.targetOrigin.vertical === 'top'}
              />
              <RadioButton
                onClick={this.setTarget.bind(this, 'vertical', 'center')}
                label="Center" checked={this.state.targetOrigin.vertical === 'center'}
              />
              <RadioButton
                onClick={this.setTarget.bind(this, 'vertical', 'bottom')}
                label="Bottom" checked={this.state.targetOrigin.vertical === 'bottom'}
              />
            </div>
            <div style={styles.block2}>
              <span>Horizontal</span>
              <div className="divider" />
              <RadioButton
                onClick={this.setTarget.bind(this, 'horizontal', 'left')}
                label="Left" checked={this.state.targetOrigin.horizontal === 'left'}
              />
              <RadioButton
                onClick={this.setTarget.bind(this, 'horizontal', 'middle')}
                label="Middle" checked={this.state.targetOrigin.horizontal === 'middle'}
              />
              <RadioButton
                onClick={this.setTarget.bind(this, 'horizontal', 'right')}
                label="Right" checked={this.state.targetOrigin.horizontal === 'right'}
              />
            </div>
          </div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={this.state.anchorOrigin}
            targetOrigin={this.state.targetOrigin}
            onRequestClose={this.handleRequestClose}
                    >
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>

        </div>
      </div>
    );
  }
}

const PopoverSection = () => (
  <article className="article">
    <h2 className="article-title">Material Popover</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="row">
          <div className="col-xl-10">
            <div className="row">
              <PopoverExampleSimple />
              <PopoverExampleAnimation />
            </div>

            <div className="divider divider-xl divider-dashed" />
            <div className="box box-transparent">
              <div className="box-header">Anchor playground</div>
              <div className="box-body">
                <PopoverExampleConfigurable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>

    );

module.exports = PopoverSection;
