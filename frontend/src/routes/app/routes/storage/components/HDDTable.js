import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const tableData = [
    {
        name: 'HDD 0',
        status: 'Unpowered',
    },
    {
        name: 'HDD 1',
        status: 'Powered. Not Mounted',
        space: '1GB',
    },
    {
        name: 'HDD 2',
        status: 'Mounted',
        space: '3TB',
    },
    {
        name: 'HDD 3',
        status: 'Mounted',
        space: '500MB',
    },
];

class HDDTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            showRowHover: true,
            showCheckboxes: false,
        };
    }

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    render() {
        return (
            <div className="row">
                <div className="col-xl-12">
                    <div className="box box-default">
                        <div className="box-header">HDD Status</div>
                        <div className="box-body">
                            <Table fixedHeader={this.state.fixedHeader}>
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}
                                >
                                    <TableRow>
                                        <TableHeaderColumn tooltip="The ID (Number in List)">ID</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="The Drive Name">Name</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip="The Status (Mounted or Not and if it is Powered)">Status</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip="The Occupied Space on the Drive">Space</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>

                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}
                                    showRowHover={this.state.showRowHover}
                                >
                                    {tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{index}</TableRowColumn>
                                            <TableRowColumn>{row.name}</TableRowColumn>
                                            <TableRowColumn>{row.status}</TableRowColumn>
                                            <TableRowColumn>{row.space}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = HDDTable;
