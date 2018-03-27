import React from 'react';
import Paper from 'material-ui/Paper';
import {
    FilteringState,
    GroupingState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedSorting,
    SortingState,
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
    Toolbar,
} from '@devexpress/dx-react-grid-material-ui';

import {ProgressBarCell} from 'material-ui/components/progress-bar-cell';
import {HighlightedCell} from 'material-ui/components/highlighted-cell';
import {CurrencyTypeProvider} from 'material-ui/components/currency-type-provider';
import {PercentTypeProvider} from 'material-ui/components/percent-type-provider';

const tableData = [
    {
        name: 'HDD 0',
        status: 'Off',
    },
    {
        name: 'HDD 1',
        capacity: 50,
        size: '2G',
        used: '1G',
        available: '1G',
        status: 'On',
    },
    {
        name: 'HDD 2',
        capacity: 0,
        size: '5T',
        used: '0',
        available: '5T',
        status: 'Mounted',
    },
    {
        name: 'HDD 3',
        capacity: 15,
        size: '256M',
        used: '37M',
        available: '220M',
        status: 'Mounted',
    },
    {
        name: 'HDD 4',
        capacity: 90,
        size: '1M',
        used: '900M',
        available: '100M',
        status: 'Mounted',
    },
];

export default class HDDTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {name: 'product', title: 'Product'},
                {name: 'region', title: 'Region'},
                {name: 'amount', title: 'Sale Amount'},
                {name: 'discount', title: 'Discount'},
                {name: 'saleDate', title: 'Sale Date'},
                {name: 'customer', title: 'Customer'},
            ],
            tableColumnExtensions: [
                {columnName: 'amount', align: 'right'},
            ],
            rows: generateRows({columnValues: globalSalesValues, length: 1000}),
            pageSizes: [5, 10, 15],
            currencyColumns: ['amount'],
            percentColumns: ['discount'],
        };
    }

    render() {
        const {
            rows, columns, tableColumnExtensions,
            currencyColumns, percentColumns,
        } = this.state;

        return (
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <FilteringState
                        defaultFilters={[{columnName: 'saleDate', value: '2016-02'}]}
                    />
                    <SortingState
                        defaultSorting={[
                            {columnName: 'product', direction: 'asc'},
                            {columnName: 'saleDate', direction: 'asc'},
                        ]}
                    />

                    <GroupingState
                        defaultGrouping={[{columnName: 'product'}]}
                        defaultExpandedGroups={['EnviroCare Max']}
                    />

                    <IntegratedGrouping/>
                    <IntegratedFiltering/>
                    <IntegratedSorting/>

                    <CurrencyTypeProvider for={currencyColumns}/>
                    <PercentTypeProvider for={percentColumns}/>

                    <DragDropProvider/>

                    <Table
                        columnExtensions={tableColumnExtensions}
                        cellComponent={Cell}
                    />

                    <TableColumnReordering defaultOrder={columns.map(column => column.name)}/>

                    <TableHeaderRow showSortingControls/>
                    <TableFilterRow/>

                    <TableGroupRow/>

                    <Toolbar/>
                    <GroupingPanel showSortingControls/>
                    <ColumnChooser/>
                </Grid>
            </Paper>
        );
    }
}
