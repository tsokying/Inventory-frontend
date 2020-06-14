import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { addStock } from "../../actions/stockActions";
import { Modal, Button } from "react-bootstrap";

class UploadStockModel extends Component {
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
                        Upload Stock Records
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                name="productId"
                                value={this.state.productId}
                                onChange={this.onChange}
                            >
                            </input>
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                name="locationId"
                                value={this.state.locationId}
                                onChange={this.onChange}
                            >
                            </input>
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                name="stockQty"
                                placeholder="stockQty"
                                value={this.state.stockQty}
                                onChange={this.onChange}
                            />
                            {errors.summary && (
                                <div className="invalid-feedback">
                                    {errors.summary}
                                </div>
                            )}
                        </div>

                        <input
                            type="submit"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

UploadStockModel.protoTypes = {
    addStock: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { addStock })(UploadStockModel);
