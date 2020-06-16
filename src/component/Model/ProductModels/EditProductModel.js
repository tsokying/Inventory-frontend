import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addProduct } from "../../../actions/productActions";
import { Modal, Form } from "react-bootstrap";

class EditProductModel extends Component {
    constructor() {
        super();
        this.state = {
            productId: "",
            code: "",
            name: "",
            weight: "",
            status: "",
            errors: {},
        }
    }
    
    componentDidMount() {
        const { productId, code, name, weight, status } = this.props.product;
        this.setState({ productId, code, name, weight, status });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        const { productId, code, name, weight, status } = nextProps.product;
        this.setState({ productId, code, name, weight, status });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toUpdate = () => {
        const updatedProduct = {
            productId: this.state.productId,
            code: this.state.code,
            name: this.state.name,
            weight: this.state.weight,
            status: this.state.status,
        };
        this.props.addProduct(updatedProduct);
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
                    You are editing product record {this.state.productId}.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={this.toUpdate}>
                        <Form.Group controlId="code">
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Product Code"
                                value={this.state.code}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Product ID"
                                value={this.state.name}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Label>Weight: </Form.Label>
                        <Form.Group controlId="weight">
                            <Form.Control
                                type="number"
                                min="0.01"
                                step="0.01"
                                name="weight"
                                placeholder="Weight"
                                value={this.state.weight}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Label>Status: </Form.Label>
                        <Form.Group controlId="status">
                            <Form.Control
                                type="text"
                                placeholder="Status"
                                value={this.state.status}
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

EditProductModel.protoTypes = {
    addProduct: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { addProduct })(EditProductModel);
