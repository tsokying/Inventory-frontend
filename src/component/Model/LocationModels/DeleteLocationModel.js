import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteLocation } from "../../../actions/locationActions";
import { Modal, Form } from "react-bootstrap";

class DeleteLocationModel extends Component {

    onDeleteClick(locationId) {
        this.props.deleteLocation(locationId);
    }

    render() {
        const location = this.props.location;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        You are deleting location record {location.locationId}.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="locationCode">
                            <Form.Control
                                type="text"
                                name="locationCode"
                                value={location.locationCode}
                            />
                        </Form.Group>
                        <Form.Group controlId="locationName">
                            <Form.Control
                                type="text"
                                name="locationName"
                                value={location.locationName}
                            />
                        </Form.Group>
                        <Form.Group controlId="locationType">
                            <Form.Control
                                type="text"
                                name="locationType"
                                value={location.locationType}
                            />
                        </Form.Group>
                        <button className="btn btn-danger btn-block" type="submit" onClick={this.onDeleteClick.bind(this, location.locationId)}>
                            Confirm
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

DeleteLocationModel.protoTypes = {
    location: PropTypes.object.isRequired,
    deleteLocation: PropTypes.func.isRequired,
};

export default connect(null, { deleteLocation })(DeleteLocationModel);
