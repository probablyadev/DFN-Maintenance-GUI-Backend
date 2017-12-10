import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
//
const DatePickerExampleSimple = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Simple examples</div>
      <div className="box-body">
        <DatePicker hintText="Portrait Dialog" />
        <DatePicker hintText="Landscape Dialog" mode="landscape" />
        <DatePicker hintText="Dialog Disabled" disabled />
      </div>
    </div>
  </div>
);

//
const DatePickerExampleInline = () => (
  <div className="col-lg-6">
    <div className="box box-transparent">
      <div className="box-header">Inline examples</div>
      <div className="box-body">
        <DatePicker hintText="Portrait Inline Dialog" container="inline" />
        <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
      </div>
    </div>
  </div>
);

//
const optionsStyle = {
  maxWidth: 300
};

class DatePickerExampleToggle extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate,
      maxDate,
      autoOk: false,
      disableYearSelection: false,
    };
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Ranged example</div>
        <div className="box-body">
          <div className="row">
            <div className="col-lg-6">
              <DatePicker
                floatingLabelText="Ranged Date Picker"
                autoOk={this.state.autoOk}
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
                disableYearSelection={this.state.disableYearSelection}
              />
            </div>
            <div className="col-lg-6">
              <div style={optionsStyle}>
                <DatePicker
                  onChange={this.handleChangeMinDate}
                  autoOk={this.state.autoOk}
                  floatingLabelText="Min Date"
                  defaultDate={this.state.minDate}
                  disableYearSelection={this.state.disableYearSelection}
                />
                <DatePicker
                  onChange={this.handleChangeMaxDate}
                  autoOk={this.state.autoOk}
                  floatingLabelText="Max Date"
                  defaultDate={this.state.maxDate}
                  disableYearSelection={this.state.disableYearSelection}
                />
                <div className="divider" />
                <Toggle
                  name="autoOk"
                  value="autoOk"
                  label="Auto Ok"
                  toggled={this.state.autoOk}
                  onToggle={this.handleToggle}
                />
                <div className="divider" />
                <Toggle
                  name="disableYearSelection"
                  value="disableYearSelection"
                  label="Disable Year Selection"
                  toggled={this.state.disableYearSelection}
                  onToggle={this.handleToggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DatePickerSection = () => (
  <article className="article">
    <h2 className="article-title">Material Date Picker</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">
          <div className="row">
            <DatePickerExampleSimple />
            <DatePickerExampleInline />
          </div>

          <div className="divider divider-xl divider-dashed" />
          <DatePickerExampleToggle />
        </div>
      </div>
    </section>
  </article>
);

module.exports = DatePickerSection;
