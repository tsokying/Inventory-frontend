import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Components and Actions */
import { getAllStock } from "../actions/stockActions";
import UploadStockModel from "./Model/StockModels/UploadStockModel";
import CreateStockModel from "./Model/StockModels/CreateStockModel";
import EditStockModel from "./Model/StockModels/EditStockModel";
import DeleteStockModel from "./Model/StockModels/DeleteStockModel";

/* React-boostrap-table */
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

/* Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileUpload, faPlusSquare, faPenSquare, faTrash, faSync, } from "@fortawesome/free-solid-svg-icons";

library.add(faFileUpload, faPlusSquare, faPenSquare, faTrash, faSync);

export class StockTable extends Component {
    constructor() {
        super();
        this.state = {
            stock: {},
            stockInfo: {},
            showUploadModel: false,
            showCreateModel: false,
            showEditModel: false,
            showDeleteModel: false,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getAllStock();
    };

    render() {
        /* React-boostrap-table Configuration */

        const { stocks } = this.props.stocks;
        const columns = [
            {
                dataField: "stockId",
                text: "Stock ID",
                sort: true,
                searchable: false,
            },
            {
                dataField: "locationId",
                text: "Location ID",
                sort: true,
                searchable: false,
                toggle: false
            },
            {
                dataField: "productId",
                text: "Product ID",
                sort: true,
                searchable: false,
                toggle: false
            },
            { dataField: "locationCode", text: "Location", sort: true, },
            { dataField: "locationName", text: "Location Name", sort: true, toggle: false, },
            { dataField: "code", text: "Product", sort: true },
            { dataField: "name", text: "Product Name", sort: true, toggle: false, },
            { dataField: "weight", text: "Weight per unit (kg)", sort: true, searchable: false, toggle: false },
            {
                dataField: "stockQty",
                text: "Quantity",
                sort: false,
                searchable: false,
            },
        ];
        const rowEvents = {
            onClick:(e, row, rowIndex) => {
                this.setState({ stockInfo: row});
            }};
        const { SearchBar } = Search;
        const hideCol = [columns[0], columns[1], columns[2], columns[4], columns[6], columns[7]];
        const ToggleList = ({ onColumnToggle, toggles }) => (
            <div
                className="btn-group btn-group-toggle mr-auto"
                data-toggle="buttons"
            >
                {hideCol.map((column) => ({
                    ...column,
                    toggle: toggles[column.dataField],
                })).map((column) => (
                    <button
                        type="button"
                        key={column.dataField}
                        className={`btn ${
                            column.toggle ? "btn-primary" : "btn-secondary"
                        }`}
                        data-toggle="button"
                        aria-pressed={column.toggle ? "true" : "false"}
                        onClick={() => onColumnToggle(column.dataField)}
                    >
                    {column.text}
                    </button>
                ))}
            </div>
        );

        /* Pop-up Models */

        const Models = () => (
            <React.Fragment>
                <UploadStockModel show={this.state.showUploadModel} onHide={modelClose} />
                <CreateStockModel show={this.state.showCreateModel} onHide={modelClose} />
                <EditStockModel stockInfo={this.state.stockInfo} show={this.state.showEditModel} onHide={modelClose} />
                <DeleteStockModel stockInfo={this.state.stockInfo} show={this.state.showDeleteModel} onHide={modelClose} />
            </React.Fragment>
        );

        const modelClose = () => {
            this.setState({ showUploadModel: false });
            this.setState({ showCreateModel: false });
            this.setState({ showEditModel: false });
            this.setState({ showDeleteModel: false });
        };

        /* Return */

        return (
            <ToolkitProvider
                keyField="stockId"
                data={stocks}
                columns={columns}
                search
                columnToggle
            >
                {(props) => (
                    <div className="container" style={{ marginTop: 30 }}>
                        <div className="d-flex justify-content-end">
                            <ToggleList {...props.columnToggleProps} />
                            <button
                                className="btn btn-primary"
                                title="Reload"
                                onClick={this.loadData}
                            >
                                <FontAwesomeIcon icon="sync" />
                            </button>
                            <button
                                className="btn btn-secondary"
                                title="Upload csv file"
                                onClick={()=>
                                    this.setState({ showUploadModel: true })}
                            >
                                <FontAwesomeIcon icon="file-upload" />
                            </button>
                            <button
                                className="btn btn-secondary"
                                title="Creat stock record"
                                onClick={() => {
                                    this.setState({ showCreateModel: true });
                                }}
                            >
                                <FontAwesomeIcon icon="plus-square" />
                            </button>
                            <button
                                className="btn btn-secondary"
                                title="Update Quantity/ Location"
                                onClick={() => {
                                    if (Object.keys(this.state.stockInfo).length === 0 && this.state.stockInfo.constructor === Object)  {
                                        alert("Please select a row first.");
                                    } else {
                                        this.setState({ showEditModel: true });
                                    }
                                }
                            }
                            >
                                <FontAwesomeIcon icon="pen-square" />
                            </button>
                            <button
                                className="btn btn-danger"
                                title="Delete"
                                onClick={() => {
                                    if (Object.keys(this.state.stockInfo).length === 0 && this.state.stockInfo.constructor === Object) {
                                        alert("Please select a row first.");
                                    } else {
                                        this.setState({ showDeleteModel: true });
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </div>
                        <br />
                        <SearchBar
                            {...props.searchProps}
                            placeholder="Search Product or Location"
                        />
                        <BootstrapTable
                            {...props.baseProps}
                            ref={ n => this.node = n }
                            selectRow={ { mode: "radio", clickToSelect: true } }
                            pagination= { paginationFactory() }
                            rowEvents= { rowEvents }
                        />
                        <Models />
                    </div>
                )}
            </ToolkitProvider>
        );
    }
}

StockTable.propTypes = {
    getAllStock: PropTypes.func.isRequired,
    stocks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    stocks: state.stockReducer,
});

export default connect(mapStateToProps, { getAllStock })(StockTable);
