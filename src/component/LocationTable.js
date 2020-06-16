import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Components and Actions */
import { getAllLocation } from "../actions/locationActions";
import UploadLocationModel from "./Model/LocationModels/UploadLocationModel";
import CreateLocationModel from "./Model/LocationModels/CreateLocationModel";
import DeleteLocationModel from "./Model/LocationModels/DeleteLocationModel";

/* React-boostrap-table */
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

/* Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileUpload, faPlusSquare, faPenSquare, faTrash, faSync, } from "@fortawesome/free-solid-svg-icons";

library.add(faFileUpload, faPlusSquare, faPenSquare, faTrash, faSync);

export class LocationTable extends Component {
    constructor() {
        super();
        this.state = {
            location: {},
            showUploadModel: false,
            showCreateModel: false,
            showDeleteModel: false,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getAllLocation();
    };

    render() {
        /* React-boostrap-table Configuration */
        const { locations } = this.props.locations;
        const columns = [
            {
                dataField: "locationId",
                text: "Location ID",
                sort: true,
                searchable: false,
            },
            {
                dataField: "locationName",
                text: "Location Name",
                sort: true,
                toggle: false,
            },
            {
                dataField: "locationCode",
                text: "Location Code",
                sort: true,
            },
            {   dataField: "locationType", 
                text: "Location Type",    
                sort: false,
                searchable: false,},
     
        ];
        const rowEvents = {
            onClick:(e, row, rowIndex) => {
                this.setState({ location: row});
            }};
        const { SearchBar } = Search;
        const hideCol = [columns[0], columns[1]];
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
                <UploadLocationModel show={this.state.showUploadModel} onHide={modelClose} />
                <CreateLocationModel show={this.state.showCreateModel} onHide={modelClose} />
                <DeleteLocationModel location={this.state.location} show={this.state.showDeleteModel} onHide={modelClose} />
            </React.Fragment>
        );

        const modelClose = () => {
            this.setState({ showUploadModel: false });
            this.setState({ showCreateModel: false });
            this.setState({ showDeleteModel: false });
        };

        /* Return */

        return (
            <ToolkitProvider
                keyField="locationId"
                data={locations}
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
                                title="Creat location record"
                                onClick={() => {
                                    this.setState({ showCreateModel: true });
                                }}
                            >
                                <FontAwesomeIcon icon="plus-square" />
                            </button>
                            <button
                                className="btn btn-danger"
                                title="Delete"
                                onClick={() => {
                                    if (Object.keys(this.state.location).length === 0 && this.state.location.constructor === Object) {
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
                            placeholder="Search Location code or name"
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

LocationTable.propTypes = {
    getAllLocation: PropTypes.func.isRequired,
    locations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    locations: state.locationReducer,
});

export default connect(mapStateToProps, { getAllLocation })(LocationTable);
