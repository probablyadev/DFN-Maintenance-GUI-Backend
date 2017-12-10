import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import QueueAnim from 'rc-queue-anim';

const TableExampleSimple = () => (
  <article className="article">
    <h2 className="article-title">Simple Data Table</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>2</TableRowColumn>
          <TableRowColumn>Randal White</TableRowColumn>
          <TableRowColumn>Unemployed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>3</TableRowColumn>
          <TableRowColumn>Stephanie Sanders</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>4</TableRowColumn>
          <TableRowColumn>Steve Brown</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </article>
);

// Cmplex example
const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

class TableExampleComplex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Complex example</h2>
        <div className="row">
          <div className="col-xl-9">
            <Table
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
                        >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
                            >
                <TableRow>
                  <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                    Super Header
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                  <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
                            >
                {tableData.map((row, index) => (
                  <TableRow key={index} selected={row.selected}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{row.name}</TableRowColumn>
                    <TableRowColumn>{row.status}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter
                adjustForCheckbox={this.state.showCheckboxes}
                            >
                <TableRow>
                  <TableRowColumn>ID</TableRowColumn>
                  <TableRowColumn>Name</TableRowColumn>
                  <TableRowColumn>Status</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                    Super Footer
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="col-xl-3">
            <h6>Table Properties</h6>
            <TextField
              floatingLabelText="Table Body Height"
              defaultValue={this.state.height}
              onChange={this.handleChange}
            />
            <Toggle
              name="fixedHeader"
              label="Fixed Header"
              onToggle={this.handleToggle}
              defaultToggled={this.state.fixedHeader}
            />
            <Toggle
              name="fixedFooter"
              label="Fixed Footer"
              onToggle={this.handleToggle}
              defaultToggled={this.state.fixedFooter}
            />
            <Toggle
              name="selectable"
              label="Selectable"
              onToggle={this.handleToggle}
              defaultToggled={this.state.selectable}
            />
            <Toggle
              name="multiSelectable"
              label="Multi-Selectable"
              onToggle={this.handleToggle}
              defaultToggled={this.state.multiSelectable}
            />
            <Toggle
              name="enableSelectAll"
              label="Enable Select All"
              onToggle={this.handleToggle}
              defaultToggled={this.state.enableSelectAll}
            />
            <h6>TableBody Properties</h6>
            <Toggle
              name="deselectOnClickaway"
              label="Deselect On Clickaway"
              onToggle={this.handleToggle}
              defaultToggled={this.state.deselectOnClickaway}
            />
            <Toggle
              name="stripedRows"
              label="Stripe Rows"
              onToggle={this.handleToggle}
              defaultToggled={this.state.stripedRows}
            />
            <Toggle
              name="showRowHover"
              label="Show Row Hover"
              onToggle={this.handleToggle}
              defaultToggled={this.state.showRowHover}
            />
            <h6>Multiple Properties</h6>
            <Toggle
              name="showCheckboxes"
              label="Show Checkboxes"
              onToggle={this.handleToggle}
              defaultToggled={this.state.showCheckboxes}
            />
          </div>
        </div>
      </article>
    );
  }
}

const Page = () => (
  <div className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><TableExampleSimple /></div>
      <div key="2"><TableExampleComplex /></div>
    </QueueAnim>
  </div>
);

module.exports = Page;
