import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Components and Actions */
import { getAllStock } from "../actions/stockActions";
import { getStock } from "../actions/stockActions";
import { getAllProduct } from "../actions/productActions";
import { getAllLocation } from "../actions/locationActions";
import UploadStockModel from "./Model/UploadStockModel";
import CreateStockModel from "./Model/CreateStockModel";
import EditStockModel from "./Model/EditStockModel";
import DeleteStockModel from "./Model/DeleteStockModel";

/* React-boostrap-table */
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

/* Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileUpload, faPlusSquare, faPenSquare, faTrash, faSync, } from "@fortawesome/free-solid-svg-icons";

library.add(faFileUpload, faPlusSquare, faPenSquare, faTrash, faSync);

export class Table extends Component {
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
        this.props.getAllProduct();
        this.props.getAllLocation();
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
                hidden: true,
            },
            { dataField: "locationCode", text: "Location", sort: true },
            { dataField: "locationName", text: "Location Name", sort: true },
            {
                dataField: "productId",
                text: "Product ID",
                sort: true,
                searchable: false,
                hidden: true,
            },
            { dataField: "productName", text: "Product", sort: true },
            {
                dataField: "stockQty",
                text: "Quantity",
                sort: false,
                searchable: true,
            },
        ];
        const rowEvents = {
            onClick:(e, row, rowIndex) => {
                this.setState({ stockInfo: row});
            }};
        const { SearchBar } = Search;
        const idCol = [columns[0], columns[1], columns[4]];
        const ToggleList = ({ onColumnToggle, toggles }) => (
            <div
                className="btn-group btn-group-toggle mr-auto"
                data-toggle="buttons"
            >
                {idCol.map((column) => ({
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

        let modelClose = () => {
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
                                title="Creat/ Receive Stock"
                                onClick={() => {
                                    this.setState({ showCreateModel: true });
                                }}
                            >
                                <FontAwesomeIcon icon="plus-square" />
                            </button>
                            <button
                                className="btn btn-secondary"
                                title="Update Quantity/ Make Transfer"
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
                                        this.props.getStock(this.state.stockInfo.stockId);
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

Table.propTypes = {
    getAllStock: PropTypes.func.isRequired,
    getStock: PropTypes.func.isRequired,
    getAllProduct: PropTypes.func.isRequired,
    getAllLocation: PropTypes.func.isRequired,
    stocks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    stocks: state.stockReducer,
    products: state.ProductReducer,
    locations: state.LocationReducer,
});

export default connect(mapStateToProps, { getAllStock, getStock, getAllProduct, getAllLocation })(Table);
