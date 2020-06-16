import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteStock } from "../../../actions/stockActions";
import { Modal, Form } from "react-bootstrap";

class DeleteStockModel extends Component {

    onDeleteClick(stock_id) {
        this.props.deleteStock(stock_id);
    }

    render() {
        const stockInfo = this.props.stockInfo;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        You are deleting stock record {stockInfo.stockId}.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>
                            Location ID: {stockInfo.locationId}
                        </Form.Label>
                        <Form.Group controlId="locationCode">
                            <Form.Control
                                type="text"
                                name="locationCode"
                                value={stockInfo.locationCode}
                            />
                        </Form.Group>
                        <Form.Group controlId="locationName">
                            <Form.Control
                                type="text"
                                name="locationName"
                                value={stockInfo.locationName}
                            />
                        </Form.Group>
                        <Form.Label>
                            Product ID: {stockInfo.productId}
                        </Form.Label>
                        <Form.Group controlId="code">
                            <Form.Control
                                type="text"
                                name="code"
                                value={stockInfo.code}
                            />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Control
                                type="text"
                                name="name"
                                value={stockInfo.name}
                            />
                        </Form.Group>
                        <Form.Label>Weight: </Form.Label>
                        <Form.Group controlId="weight">
                            <Form.Control
                                type="number"
                                name="weight"
                                value={stockInfo.weight}
                            />
                        </Form.Group>
                        <Form.Label>Quantity: </Form.Label>
                        <Form.Group controlId="stockQty">
                            <Form.Control
                                type="number"
                                name="stockQty"
                                value={stockInfo.stockQty}
                            />
                        </Form.Group>
                        <button className="btn btn-danger btn-block" type="submit" onClick={this.onDeleteClick.bind(this, stockInfo.stockId)}>
                            Confirm
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

DeleteStockModel.protoTypes = {
    stock: PropTypes.object.isRequired,
    deleteStock: PropTypes.func.isRequired,
};

export default connect(null, { deleteStock })(DeleteStockModel);
