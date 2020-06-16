import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { uploadProduct } from "../../../actions/productActions";
import { Modal } from "react-bootstrap";

class UploadProductModel extends Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null,
            data: [],
            errors: {},
        };
    }

    onFileChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] }); 
    };

    onFileUpload = () => { 
        if (this.state.selectedFile != null) {
            const formData = new FormData();
            formData.append("file", this.state.selectedFile);
            this.props.uploadProduct(formData);
        } else {
            alert("Please select a file first.");
        }
    };

    render() {

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload Product Record (csv file)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex"> 
                        <input className="input-group-text" type="file" onChange={this.onFileChange} /> 
                        <button className="btn btn-primary" onClick={this.onFileUpload}> 
                        Upload! 
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

UploadProductModel.protoTypes = {
    uploadProduct: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errorsReducer,
});

export default connect(mapStateToProps, { uploadProduct })(UploadProductModel);
