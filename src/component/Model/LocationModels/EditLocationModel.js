import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addLocation } from "../../../actions/locationActions";
import { Modal, Form } from "react-bootstrap";

class EditLocationModel extends Component {
    constructor() {
        super();
        this.state = {
            locationId: "",
            locationCode: "",
            locationName: "",
            locationType: "",
            errors: {},
        }
    }
    
    componentDidMount() {
        const { locationId, locationCode, locationName, locationType } = this.props.location;
        this.setState({ locationId, locationCode, locationName, locationType  });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        const { locationId, locationCode, locationName, locationType } = nextProps.location;
        this.setState({ locationId, locationCode, locationName, locationType  });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toUpdate = () => {
        const updatedLocation = {
            locationId: this.state.locationId,
            locationCode: this.state.locationCode,
            locationName: this.state.locationName,
            locationType: this.state.locationType,
        };
        this.props.addLocation(updatedLocation);
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
                    You are editing location record {this.state.locationId}.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={this.toUpdate}>
                        <Form.Group controlId="locationCode">
                            <Form.Control
                                type="text"
                                name="locationCode"
                                placeholder="Location Code"
                                value={this.state.locationCode}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="locationName">
                            <Form.Control
                                type="text"
                                name="locationName"
                                placeholder="Location Name"
                                value={this.state.locationName}
                                readOnly
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
                        <button className="btn btn-primary btn-block" type="submit">
                            Submit
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

EditLocationModel.protoTypes = {
    addLocation: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { addLocation })(EditLocationModel);
