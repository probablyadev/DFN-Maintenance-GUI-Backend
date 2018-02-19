import React from 'react';

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
            <article className="article">
                <h2 className="article-title">HDD Status</h2>
                <div className="box box-default table-box table-responsive mdl-shadow--2dp">
                    <table className="mdl-data-table">
                        <thead>
                            <tr>
                                <th className="mdl-data-table__cell--non-numeric">#</th>
                                <th className="mdl-data-table__cell--non-numeric">Name</th>
                                <th className="mdl-data-table__cell--non-numeric">Capacity</th>
                                <th className="mdl-data-table__cell--non-numeric">Usage</th>
                                <th className="mdl-data-table__cell--non-numeric">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td className="mdl-data-table__cell--non-numeric">{index}</td>
                                    <td className="mdl-data-table__cell--non-numeric">{row.name}</td>
                                    <td className="mdl-data-table__cell--non-numeric">TODO - bar (spin template)</td>
                                    <td className="mdl-data-table__cell--non-numeric">{row.space}</td>
                                    <td className="mdl-data-table__cell--non-numeric">{row.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        );
    }

    /*
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
                                        <TableHeaderColumn tooltip="The ID (Number in List)">#</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="The Drive Name">Name</TableHeaderColumn>
                                        <TableHeaderColumn tooltip="The Drive Capacity">Capacity</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip="The Drive Disk Usage (Used / Total)">Usage</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip="The Status (Mounted or Not and if it is Powered)">Status</TableHeaderColumn>
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
                                            <TableRowColumn>TODO</TableRowColumn>
                                            <TableRowColumn>{row.space}</TableRowColumn>
                                            <TableRowColumn>{row.status}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    } */
}

module.exports = HDDTable;
