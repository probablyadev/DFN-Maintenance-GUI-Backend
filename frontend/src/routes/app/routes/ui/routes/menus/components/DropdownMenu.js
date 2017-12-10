import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class DropDownMenuSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Simple example</div>
        <div className="box-body">
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

//
class DropDownMenuOpenImmediateExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Open Immediate example</div>
        <div className="box-body">
          <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

//
const items = [];
for (let i = 0; i < 100; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

class DropDownMenuLongMenuExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 10};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Long example</div>
        <div className="box-body">
          <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
            {items}
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

//
class DropDownMenuLabeledExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="box box-transparent">
        <div className="box-header">Label example</div>
        <div className="box-body">
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
            <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
            <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
            <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
          </DropDownMenu>
        </div>
      </div>
    );
  }
}

const DropdownSection = () => (
  <article className="article">
    <h2 className="article-title">Dropdown Menu</h2>

    <section className="box box-default">
      <div className="box-body padding-xl">
        <div className="col-xl-10">

          <div className="row">
            <div className="col-lg-6">
              <DropDownMenuSimpleExample />
            </div>
            <div className="col-lg-6">
              <DropDownMenuOpenImmediateExample />
            </div>
          </div>

          <div className="divider divider-xl divider-dashed" />
          <div className="row">
            <div className="col-lg-6">
              <DropDownMenuLongMenuExample />
            </div>
            <div className="col-lg-6">
              <DropDownMenuLabeledExample />
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
);

module.exports = DropdownSection;
