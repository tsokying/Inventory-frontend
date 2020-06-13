import React, { Component } from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

class AddStock extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Creat Stock Log
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export class AddStock