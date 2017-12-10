import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class HorizontalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <article className="article">
        <h2 className="article-title">Horizontal linear stepper</h2>
        <div className="box box-default">
          <div className="box-body padding-xl">

            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Select campaign settings</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Create an ad group</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Create an ad</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                {finished ? (
                  <p>
                    <a
                      href="javascript:;"
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({stepIndex: 0, finished: false});
                      }}
                    >
                      Click here
                      </a> to reset the example.
                      </p>
                  ) : (
                    <div>
                      <p>{this.getStepContent(stepIndex)}</p>
                      <div style={{marginTop: 12}}>
                        <FlatButton
                          label="Back"
                          disabled={stepIndex === 0}
                          onClick={this.handlePrev}
                          style={{marginRight: 12}}
                        />
                        <RaisedButton
                          label={stepIndex === 2 ? 'Finish' : 'Next'}
                          primary
                          onClick={this.handleNext}
                        />
                      </div>
                    </div>
                  )}
              </div>

              <div className="divider divider-xl" />
              <div className="callout callout-info">
                <p>Horizontal steppers are ideal when the contents of one step depend on an earlier step.</p>
              </div>
            </div>

          </div>
        </div>
      </article>
    );
  }
}


export default HorizontalLinearStepper;
