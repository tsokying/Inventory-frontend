import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { addStock } from "../../actions/stockActions";
import { Modal, Button, Form } from "react-bootstrap";

class CreateStockModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: "",
            locationId: "",
            stockQty: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
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
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="locationId">
                            <Form.Control
                                type="number"
                                name="locationId"
                                placeholder="location ID"
                                value={this.state.locationId}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="productId">
                            <Form.Control
                                type="number"
                                name="productId"
                                placeholder="Product ID"
                                value={this.state.productId}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="stockQty">
                            <Form.Control
                                type="number"
                                name="stockQty"
                                placeholder="stock Quantity"
                                value={this.state.stockQty}
                                onChange={this.onChange}
                            />
                            {errors.summary && (
                                <div className="invalid-feedback">
                                    {errors.summary}
                                </div>
                            )}
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
