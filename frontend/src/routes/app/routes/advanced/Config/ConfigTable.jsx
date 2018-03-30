import React from 'react';
import Paper from 'material-ui/Paper';
import {EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableEditColumn, TableEditRow, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

const getRowId = (row) => row.id;

export default class ConfigTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {name: 'category', title: 'Category'},
                {name: 'key', title: 'Key'},
                {name: 'value', title: 'Value'}
            ],
            rows: [
                {
                    id: 0, category: 'station', key: 'hostname', value: 'DFNSMALL000'
                },
                {
                    id: 1, category: 'station', key: 'location', value: 'test_lab'
                },
                {
                    id: 2, category: 'station', key: 'lat', value: '-32.00720'
                },
                {
                    id: 3, category: 'station', key: 'long', value: '115.89469'
                },
                {
                    id: 4, category: 'station', key: 'altitude', value: '50.0'
                },

                {
                    id: 5, category: 'camera', key: 'still_camera', value: 'Nikon_D810'
                },
                {
                    id: 6, category: 'camera', key: 'night_quality', value: '4'
                },

                {
                    id: 7, category: 'firmware_control', key: 'heater_enabled', value: '0'
                },
                {
                    id: 8, category: 'firmware_control', key: 'heater_temperature_C', value: '25'
                }
            ],
            editingStateColumnExtensions: [
                {columnName: 'category', editingEnabled: false},
                {columnName: 'key', editingEnabled: false}
            ]
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({added, changed, deleted}) {
        let {rows} = this.state;

        if (added) {
            const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;

            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row
                }))
            ];
        }

        if (changed) {
            rows = rows.map((row) => (changed[row.id] ? {...row, ...changed[row.id]} : row));
        }

        if (deleted) {
            const deletedSet = new Set(deleted);

            rows = rows.filter((row) => !deletedSet.has(row.id));
        }

        this.setState({rows});
    }

    render() {
        const {rows, columns, editingStateColumnExtensions} = this.state;

        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        columnExtensions={editingStateColumnExtensions}
                    />
                    <Table />
                    <TableHeaderRow />
                    <TableEditRow />
                    <TableEditColumn
                        showEditCommand
                    />
                </Grid>
            </Paper>
        );
    }
}
