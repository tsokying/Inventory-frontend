import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { addProduct } from "../../../actions/productActions";
import { Modal, Form } from "react-bootstrap";

class CreateProductModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            weight: "",
            status: "",
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
        const newProduct = {
            code: this.state.code,
            name: this.state.name,
            weight: this.state.weight,
            status: this.state.status,
        };
        this.props.addProduct(newProduct, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Creat Product Record
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="code">
                            <Form.Control
                                type="text"
                                className={classnames({"is-invalid": errors.summary})}
                                name="code"
                                placeholder="Product Code"
                                value={this.state.code}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        {
                            errors.summary && (
                                <div className="invalid-feedback">{errors.summary}</div>
                            )
                        }
                        <Form.Group controlId="name">
                            <Form.Control
                                type="text"
                                className={classnames({"is-invalid": errors.summary})}
                                name="name"
                                placeholder="Product Name"
                                value={this.state.name}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        {
                            errors.summary && (
                                <div className="invalid-feedback">{errors.summary}</div>
                            )
                        }
                        <Form.Group controlId="weight">
                            <Form.Control
                                type="number"
                                min="0.1"
                                step="0.1"
                                name="weight"
                                placeholder="Single Product weight (kg)"
                                value={this.state.weight}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Control
                                type="text"
                                name="status"
                                placeholder="Status"
                                value={this.state.status}
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

CreateProductModel.protoTypes = {
    addProduct: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { addProduct })(CreateProductModel);
