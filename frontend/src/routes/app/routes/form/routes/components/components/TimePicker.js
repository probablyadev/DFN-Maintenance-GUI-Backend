import React from 'react';
import TimePicker from 'material-ui/TimePicker';

const SimpleExamples = () => (
  <div className="box box-transparent">
    <div className="box-header">Simple examples</div>
    <div className="box-body">
      <TimePicker
        hintText="12hr Format"
      />
      <TimePicker
        hintText="12hr Format with auto ok"
        autoOk
      />
      <TimePicker
        format="24hr"
        hintText="24hr Format"
      />
      <TimePicker
        disabled
        format="24hr"
        hintText="Disabled TimePicker"
      />
    </div>
  </div>
);

class ControlledExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value24: null, value12: null};
  }

  handleChangeTimePicker24 = (event, date) => {
    this.setState({value24: date});
  };

  handleChangeTimePicker12 = (event, date) => {
    this.setState({value12: date});
  };

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Controlled examples</div>
        <div className="box-body">
          <TimePicker
            format="ampm"
            hintText="12hr Format"
            value={this.state.value12}
            onChange={this.handleChangeTimePicker12}
          />
          <TimePicker
            format="24hr"
            hintText="24hr Format"
            value={this.state.value24}
            onChange={this.handleChangeTimePicker24}
          />
        </div>
      </div>
    );
  }
}


const TimePickerSection = () => (
  <article className="article">
    <h2 className="article-title">Material Time Picker</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <div className="col-lg-6">
              <SimpleExamples />
            </div>
            <div className="col-md-6">
              <ControlledExamples />
            </div>
          </div>

        </div>
      </div>
    </section>
  </article>
);

module.exports = TimePickerSection;
