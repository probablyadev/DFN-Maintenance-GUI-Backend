import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableColumnResizing,
    TableEditColumn,
    TableEditRow,
    TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

import { configWhitelist } from '../../../../../actions/api';
import { organiseConfigWhitelistById } from '../../../../../selectors/api';

function mapStateToProps(state) {
    return {
        rows: organiseConfigWhitelistById(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ configWhitelist }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class ConfigTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    name: 'category',
                    title: 'Category'
                },
                {
                    name: 'field',
                    title: 'Field'
                },
                {
                    name: 'value',
                    title: 'Value'
                }
            ],
            defaultColumnWidths: [
                {
                    columnName: 'category',
                    width: 80
                },
                {
                    columnName: 'field',
                    width: 140
                },
                {
                    columnName: 'value',
                    width: 166
                }
            ],
            editingStateColumnExtensions: [
                {
                    columnName: 'category',
                    editingEnabled: false
                },
                {
                    columnName: 'field',
                    editingEnabled: false
                }
            ]
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    componentDidMount() {
        this.props.configWhitelist();
    }

    commitChanges({ changed }) {
        let { rows } = this.props;

        rows = rows.map((row) => {
            if (changed[row.id]) {
                console.log(row);
                console.log(changed[row.id]);

                return { ...row, ...changed[row.id] };
            } else {
                return row;
            }
        });

        this.setState({ rows });
    }

    render() {
        const {
            columns,
            editingStateColumnExtensions,
            defaultColumnWidths
        } = this.state;
        const { rows } = this.props;

        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        columnExtensions={editingStateColumnExtensions}
                    />
                    <Table/>
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths}/>
                    <TableHeaderRow/>
                    <TableEditRow/>
                    <TableEditColumn
                        showEditCommand
                    />
                </Grid>
            </Paper>
        );
    }
}

export default ConfigTable;
