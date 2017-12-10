import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectFieldExampleSimple extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Simple examples</div>
          <div className="box-body">
            <SelectField
              floatingLabelText="Frequency"
              value={this.state.value}
              onChange={this.handleChange}
                        >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <br />
            <SelectField floatingLabelText="Frequency" value={1} disabled>
              <MenuItem value={1} primaryText="Disabled" />
              <MenuItem value={2} primaryText="Every Night" />
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}

class SelectFieldExampleNullable extends React.Component {
  state = {
    value: null,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Nullable select</div>
          <div className="box-body">
            <SelectField
              floatingLabelText="Ready?"
              value={this.state.value}
              onChange={this.handleChange}
                        >
              <MenuItem value={null} primaryText="" />
              <MenuItem value={false} primaryText="No" />
              <MenuItem value primaryText="Yes" />
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}

//
const longItems = [];
for (let i = 0; i < 100; i++) {
  longItems.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}
class DropDownMenuLongMenuExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 10};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Long examples</div>
          <div className="box-body">
            <SelectField
              onChange={this.handleChange}
              value={this.state.value}
              maxHeight={200}
                        >
              {longItems}
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}

//
class SelectFieldExampleCustomLabel extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="col-lg-6">
        <div className="box box-transparent">
          <div className="box-header">Label examples</div>
          <div className="box-body">
            <SelectField value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
              <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
              <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
              <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}


const SelectFieldSection = () => (
  <article className="article">
    <h2 className="article-title">Material Select Field</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <SelectFieldExampleSimple />
            <SelectFieldExampleNullable />
          </div>
          <div className="row">
            <DropDownMenuLongMenuExample />
            <SelectFieldExampleCustomLabel />
          </div>

        </div>
      </div>
    </section>
  </article>
);

module.exports = SelectFieldSection;
