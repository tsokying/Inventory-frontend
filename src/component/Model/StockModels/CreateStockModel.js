import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addStock } from "../../../actions/stockActions";
import { Modal, Form } from "react-bootstrap";

class CreateStockModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: "",
            locationId: "",
            stockQty: "",
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
        const newStock = {
            productId: this.state.productId,
            locationId: this.state.locationId,
            stockQty: this.state.stockQty,
        };
        this.props.addStock(newStock, this.props.history);
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
                        Creat Stock Record
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.toCreate}>
                        <Form.Group controlId="locationId">
                            <Form.Control
                                type="number"
                                min="1"
                                name="locationId"
                                placeholder="location ID"
                                value={this.state.locationId}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productId">
                            <Form.Control
                                type="number"
                                min="1"
                                name="productId"
                                placeholder="Product ID"
                                value={this.state.productId}
                                onChange={this.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="stockQty">
                            <Form.Control
                                type="number"
                                min="1"
                                name="stockQty"
                                placeholder="Stock Quantity"
                                value={this.state.stockQty}
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

CreateStockModel.protoTypes = {
    addStock: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { addStock })(CreateStockModel);
