import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteProduct } from "../../../actions/productActions";
import { Modal, Form } from "react-bootstrap";

class DeleteProductModel extends Component {

    onDeleteClick(productId) {
        this.props.deleteProduct(productId);
    }

    render() {
        const product = this.props.product;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        You are deleting product record {product.productId}.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>
                            Product ID: {product.productId}
                        </Form.Label>
                        <Form.Group controlId="code">
                            <Form.Control
                                type="text"
                                name="code"
                                value={product.code}
                            />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Control
                                type="text"
                                name="name"
                                value={product.name}
                            />
                        </Form.Group>
                        <Form.Label>Weight: </Form.Label>
                        <Form.Group controlId="weight">
                            <Form.Control
                                type="number"
                                name="weight"
                                value={product.weight}
                            />
                        </Form.Group>
                        <Form.Label>Status: </Form.Label>
                        <Form.Group controlId="status">
                            <Form.Control
                                type="text"
                                name="status"
                                value={product.status}
                            />
                        </Form.Group>
                        <button className="btn btn-danger btn-block" type="submit" onClick={this.onDeleteClick.bind(this, product.productId)}>
                            Confirm
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

DeleteProductModel.protoTypes = {
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteProduct })(DeleteProductModel);
