import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export class Table extends Component {
    state = {
        items: [],
        columns: [
            {
                dataField: "id",
                text: "Stock ID",
                sort: true,
            },
            {
                dataField: "product_id",
                text: "Product ID",
                sort: true,
            },
            {
                dataField: "location_id",
                text: "Location ID",
                sort: true,
            },
            {
                dataField: "product_name",
                text: "Product",
                sort: true,
            },
            {
                dataField: "location_name",
                text: "Location",
                sort: true,
            },
            {
                dataField: "qty",
                text: "Quantity",
                sort: true,
            },

        ],
    };

    render() {
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    boarderd
                    hover
                    keyField="id"
                    data={this.state.items}
                    columns={this.state.columns}
                    pagination={ paginationFactory() }
                />
            </div>
        );
    }
}

export default Table;
