import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addLocation } from "../../../actions/locationActions";
import { Modal, Form } from "react-bootstrap";

class CreateLocationModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationCode: "",
            locationName: "",
            locationType: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toCreate = () => {
        const newLocation = {
            locationCode: this.state.locationCode,
            locationName: this.state.locationName,
            locationType: this.state.locationType,
        };
        this.props.addLocation(newLocation, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Creat Location Record
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="locationCode">
                            <Form.Control
                                type="text"
                                name="locationCode"
                                placeholder="Location Code"
                                value={this.state.locationCode}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="locationName">
                            <Form.Control
                                type="text"
                                name="locationName"
                                placeholder="Location Name"
                                value={this.state.locationName}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="locationType">
                            <Form.Control
                                type="text"
                                name="locationType"
                                placeholder="Location Type"
                                value={this.state.locationType}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <button className="btn btn-primary btn-block" type="submit" onClick={this.toCreate}>
                            Submit
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

CreateLocationModel.protoTypes = {
    addLocation: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { addLocation })(CreateLocationModel);
