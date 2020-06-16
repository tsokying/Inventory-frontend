import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Components and Actions */
import { getAllProduct } from "../actions/productActions";
import UploadProductModel from "./Model/ProductModels/UploadProductModel";
import CreateProductModel from "./Model/ProductModels/CreateProductModel";
import EditProductModel from "./Model/ProductModels/EditProductModel";
import DeleteProductModel from "./Model/ProductModels/DeleteProductModel";

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
    constructor() {
        super();
        this.state = {
            product: {},
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
    };

    render() {
        /* React-boostrap-table Configuration */
        const { products } = this.props.products;
        const columns = [
            {
                dataField: "productId",
                text: "Product ID",
                sort: true,
                searchable: false,
            },
            {
                dataField: "code",
                text: "Product",
                sort: true,
            },
            {
                dataField: "name",
                text: "Product Name",
                sort: true,
                toggle: false
            },
            { dataField: "weight", text: "Weight", sort: true, searchable: false,},
            {
                dataField: "status",
                text: "Status",
                sort: false,
                searchable: false,
                toggle: false
            },
        ];
        const rowEvents = {
            onClick:(e, row, rowIndex) => {
                this.setState({ product: row});
            }};
        const { SearchBar } = Search;
        const hideCol = [columns[0], columns[2], columns[4]];
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
                <UploadProductModel show={this.state.showUploadModel} onHide={modelClose} />
                <CreateProductModel show={this.state.showCreateModel} onHide={modelClose} />
                <EditProductModel product={this.state.product} show={this.state.showEditModel} onHide={modelClose} />
                <DeleteProductModel product={this.state.product} show={this.state.showDeleteModel} onHide={modelClose} />
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
                                title="Creat product record"
                                onClick={() => {
                                    this.setState({ showCreateModel: true });
                                }}
                            >
                                <FontAwesomeIcon icon="plus-square" />
                            </button>
                            <button
                                className="btn btn-secondary"
                                title="Update product's detail"
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
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </div>
                        <br />
                        <SearchBar
                            {...props.searchProps}
                            placeholder="Search Product code or name"
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
    getAllProduct: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.productReducer,
});

export default connect(mapStateToProps, { getAllProduct })(ProductTable);
