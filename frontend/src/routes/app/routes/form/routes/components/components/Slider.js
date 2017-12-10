import React from 'react';
import Slider from 'material-ui/Slider';
//
const SliderExampleSimple = () => (
  <div className="box box-default">
    <div className="box-header">Simple examples</div>
    <div className="box-body">
      <Slider />
      <Slider defaultValue={0.5} />
      <Slider defaultValue={1} />
    </div>
  </div>
);

//
const SliderExampleDisabled = () => (
  <div className="box box-default">
    <div className="box-header">Disabled examples</div>
    <div className="box-body">
      <Slider disabled />
      <Slider disabled value={0.5} />
      <Slider disabled value={1} />
    </div>
  </div>
);

//
const SliderExampleStep = () => (
  <div className="box box-default">
    <div className="box-header">Stepped examples</div>
    <div className="box-body">
      <Slider step={0.10} value={1} />
      <Slider step={0.20} value={1} />
    </div>
  </div>
);

class SliderExampleControlled extends React.Component {
  state = {
    secondSlider: 50,
  };

  handleSecondSlider = (event, value) => {
    this.setState({secondSlider: value});
  };

  render() {
    return (
      <div className="box box-default">
        <div className="box-header">Controlled examples</div>
        <div className="box-body">
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={50}
            value={this.state.secondSlider}
            onChange={this.handleSecondSlider}
                    />
          <div className="callout callout-info no-margin-bottom">
            <p>
              <span>{'The value of this slider is: '}</span>
              <span>{this.state.secondSlider}</span>
              <span>{' from a range of 0 to 100 inclusive'}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    height: 124,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

const SliderExampleAxis = () => (
  <div className="box box-default">
    <div className="box-header">Alternative Axis Examples</div>
    <div className="box-body">
      <div style={styles.root}>
        <Slider style={{height: 100}} axis="y" defaultValue={0.5} />
        <Slider style={{width: 200}} axis="x-reverse" />
        <Slider style={{height: 100}} axis="y-reverse" defaultValue={1} />
      </div>
    </div>
  </div>
);


const SliderSection = () => (
  <article className="article">
    <h2 className="article-title">Material Slider</h2>
    <div className="row">
      <div className="col-xl-6">
        <SliderExampleSimple />
      </div>
      <div className="col-xl-6">
        <SliderExampleDisabled />
      </div>
    </div>
    <div className="row">
      <div className="col-xl-6">
        <SliderExampleStep />
      </div>
      <div className="col-xl-6">
        <SliderExampleControlled />
      </div>
    </div>

    <SliderExampleAxis />
  </article>
);

module.exports = SliderSection;
