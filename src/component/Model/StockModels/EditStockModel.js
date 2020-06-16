import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStock, addStock } from "../../../actions/stockActions";
import { Modal, Form } from "react-bootstrap";

class EditStockModel extends Component {
    constructor() {
        super();
        this.state = {
            stockId: "",
            locationId: "",
            productId: "",
            stockQty: "",
            stock: {},
            product: {},
            location: {},
            errors: {},
        }
    }

    componentDidMount() {
        const { stockId, locationId, locationCode, locationName, productId, productName, stockQty } = this.props.stockInfo;
        this.setState({ stockId, locationId, productId, stockQty, });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        const { stockId, locationId, productId, stockQty } = nextProps.stock;
        this.setState({ stockId, locationId, productId, stockQty, });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toUpdate = () => {
        /*
        if (this.state.locationId !== this.props.stockInfo.locationId) {
            if (window.confirm("This action will delete the current stock and creat a package.")) {
  
            }
        } else {
            */
            const updatedStock = {
                stockId: this.state.stockId,
                locationId: this.state.locationId,
                productId: this.state.productId,
                stockQty: this.state.stockQty,
            };
            this.props.addStock(updatedStock);
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
                    You are editing stock record {this.state.stockId}.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={this.toUpdate}>
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
                                readOnly
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

EditStockModel.protoTypes = {
    stock: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getStock: PropTypes.func.isRequired,
    addStock: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    stock: state.stockReducer.stock,
    product: state.stockReducer.product,
    location: state.stockReducer.location,
    errors: state.errorsReducer,
});

export default connect(null, { getStock, addStock })(EditStockModel);
