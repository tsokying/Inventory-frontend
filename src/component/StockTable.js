import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Components and Actions */
import { getAllStock } from "../actions/stockActions";
import { addStock } from "../actions/stockActions"

/* React-boostrap-table */
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileUpload, faPlusSquare, faEdit, faTrash, faSync } from '@fortawesome/free-solid-svg-icons'
library.add(faFileUpload, faPlusSquare, faEdit, faTrash, faSync)

export class Table extends Component {
    constructor() {
        super();
        this.state = {
            productId: "",
            locationId: "",
            stockQty: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData= () => {
        this.props.getAllStock();
    }

    uploadStock = () => {
        console.log(this.node.selectionContext.selected);
    };

    createStock = () => {
        console.log(this.node.selectionContext.selected);
    };

    editStock = () => {
        console.log(this.node.selectionContext.selected);
    };

    deleteStock = () => {
        console.log(this.node.selectionContext.selected);
    };

    render() {
        const { stocks } = this.props.stocks;
        const columns = [
            { dataField: "stockId", text: "Stock ID", sort: true, searchable: false },
            { dataField: "locationId", text: "Location ID", sort: true, searchable: false, hidden: true},
            { dataField: "locationCode", text: "Location", sort: true },
            { dataField: "locationName", text: "Location Name", sort: true },
            { dataField: "productId", text: "Product ID", sort: true, searchable: false, hidden: true },
            { dataField: "productName", text: "Product", sort: true  },
            { dataField: "stockQty", text: "Quantity", sort: false, searchable: true },
        ];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };
        const { SearchBar } = Search;

        const ToggleCol = [columns[0], columns[1], columns[4]];
        const ToggleList = ({ onColumnToggle, toggles}) => (
            <div className="btn-group btn-group-toggle mr-auto" data-toggle="buttons">
              {
                ToggleCol.map(column => ({ ...column, toggle: toggles[column.dataField]}))
                  .map(column => (
                    <button type="button" key={ column.dataField }
                      className={ `btn ${column.toggle ? 'btn-primary' : 'btn-secondary'}` }
                      data-toggle="button"
                      aria-pressed={ column.toggle ? 'true' : 'false' }
                      onClick={ () => onColumnToggle(column.dataField) }
                    > { column.text } </button>
                  ))
              }
            </div>
        );

        return (
            <ToolkitProvider
            keyField="stockId"
            data={stocks}
            columns={columns}
            search
            columnToggle
            >
            {
                props => (
                    <div className="container" style={{ marginTop: 30 }}>
                        <div className="d-flex justify-content-end">
                            <ToggleList { ...props.columnToggleProps } />
                            <button className="btn btn-primary" title="Reload" onClick={this.loadData}><FontAwesomeIcon icon="sync" /></button>
                            <button className="btn btn-secondary" title="Upload csv file" onClick={this.uploadStock}><FontAwesomeIcon icon="file-upload" /></button>
                            <button className="btn btn-secondary" title="Creat/ Receive Stock" onClick={this.createStock}><FontAwesomeIcon icon="plus-square" /></button>
                            <button className="btn btn-secondary" title="Update Quantity/ Make Transfer" onClick={this.editStock}><FontAwesomeIcon icon="edit" /></button>
                            <button className="btn btn-danger" title="Delete" onClick={this.deleteStock}><FontAwesomeIcon icon="trash" /></button>
                        </div>
                        <br />
                        <SearchBar { ...props.searchProps }
                            placeholder="Search Product or Location" />
                        <BootstrapTable
                            { ...props.baseProps } 
                            ref={ n => this.node = n }
                            selectRow={selectRow}
                            pagination={paginationFactory()} />
                    </div>
                )
            }
            </ToolkitProvider>
        );
    }
}

Table.propTypes = {
    getAllStock: PropTypes.func.isRequired,
    addStock: PropTypes.func.isRequired,
    stocks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    stocks: state.stockReducer,
});

export default connect(mapStateToProps, { getAllStock, addStock })(Table);