import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/*
import Paper from 'material-ui/Paper';
import {
    FilteringState,
    GroupingState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedSorting,
    SortingState
} from '@devexpress/dx-react-grid';
import {
    ColumnChooser,
    DragDropProvider,
    Grid,
    GroupingPanel,
    Table,
    TableColumnReordering,
    TableFilterRow,
    TableGroupRow,
    TableHeaderRow,
    Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { PercentTypeProvider } from 'material-ui/components/percent-type-provider';
*/

import { checkHDD } from '../../../../actions/api';
import { checkHDDSelector } from '../../../../selectors/api';

function mapStateToProps(state) {
    return {
        hdd: checkHDDSelector(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkHDD }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class HDDTable extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.checkHDD();
    }

    render() {
        return (<div>hdd</div>);
    }
}

/*
class HDDTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    name: 'product',
                    title: 'Product'
                },
                {
                    name: 'region',
                    title: 'Region'
                },
                {
                    name: 'amount',
                    title: 'Sale Amount'
                },
                {
                    name: 'discount',
                    title: 'Discount'
                },
                {
                    name: 'saleDate',
                    title: 'Sale Date'
                },
                {
                    name: 'customer',
                    title: 'Customer'
                }
            ],
            tableColumnExtensions: [
                {
                    columnName: 'amount',
                    align: 'right'
                }
            ],
            rows: generateRows({
                columnValues: globalSalesValues,
                length: 1000
            }),
            pageSizes: [5, 10, 15],
            currencyColumns: ['amount'],
            percentColumns: ['discount']
        };
    }

    render() {
        const {
            rows, columns, tableColumnExtensions,
            currencyColumns, percentColumns
        } = this.state;

        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <FilteringState
                        defaultFilters={[{
                            columnName: 'saleDate',
                            value: '2016-02'
                        }]}
                    />
                    <SortingState
                        defaultSorting={[
                            {
                                columnName: 'product',
                                direction: 'asc'
                            },
                            {
                                columnName: 'saleDate',
                                direction: 'asc'
                            }
                        ]}
                    />

                    <GroupingState
                        defaultGrouping={[{ columnName: 'product' }]}
                        defaultExpandedGroups={['EnviroCare Max']}
                    />

                    <IntegratedGrouping />
                    <IntegratedFiltering />
                    <IntegratedSorting />

                    <CurrencyTypeProvider for={currencyColumns} />
                    <PercentTypeProvider for={percentColumns} />

                    <DragDropProvider />

                    <Table
                        columnExtensions={tableColumnExtensions}
                        cellComponent={Cell}
                    />

                    <TableColumnReordering defaultOrder={columns.map((column) => column.name)} />

                    <TableHeaderRow showSortingControls />
                    <TableFilterRow />

                    <TableGroupRow />

                    <Toolbar />
                    <GroupingPanel showSortingControls />
                    <ColumnChooser />
                </Grid>
            </Paper>
        );
    }
}
*/

export default HDDTable;
