import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Components and Actions */
import { getAllProduct } from "../actions/productActions";
import { getProduct } from "../actions/productActions";
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

export class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            showUploadModel: false,
            showCreateModel: false,
            showEditModel: false,
            showDeleteModel: false,
        };
    }

    componentDidMount() {
        this.props.getAllProduct();
    }

    render() {
        /* React-boostrap-table Configuration */

        const { products, product } = this.props.products;
        const columns = [
            {
                dataField: "productId",
                text: "Product ID",
                sort: true,
                searchable: false,
            },
            {
                dataField: "name",
                text: "Product Name",
                sort: true,
                searchable: false,
            },
            {
                dataField: "code",
                text: "Product Code",
                sort: true,
                searchable: false,
                hidden: true,
            },
            { dataField: "status", text: "Status", },
        ];
        const rowEvents = {
            onClick:(e, row, rowIndex) => {
                this.setState({ product: row});
            }};
        const { SearchBar } = Search;
        const idCol = [columns[0]];
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
            </React.Fragment>
        );

        let modelClose = () => {
            this.setState({ showUploadModel: false });
            this.setState({ showCreateModel: false });
            this.setState({ showEditModel: false });
            this.setState({ showDeleteModel: false });
            this.loadData();
        };

        /* Return */

        return (
            <ToolkitProvider
                keyField="productId"
                data={products}
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
                                title="Creat Product"
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
                                    if (Object.keys(this.state.product).length === 0 && this.state.product.constructor === Object)  {
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
                                    if (Object.keys(this.state.product).length === 0 && this.state.product.constructor === Object) {
                                        alert("Please select a row first.");
                                    } else {
                                        this.setState({ showDeleteModel: true });
                                        this.props.getProduct(this.state.product.productId);
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

ProductTable.propTypes = {
    products: PropTypes.object.isRequired,
    getAllProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.ProductReducer,
});

export default connect(mapStateToProps, { getAllProduct })(ProductTable);
