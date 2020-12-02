import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import {ModalContentProps} from './ModalProps';

export default class ConfirmationModalContent extends Component<ModalContentProps> {
    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.description}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        if(this.props.responseHandler){
                            this.props.responseHandler(false,()=>{
                                this.props.modal.closeModal();
                            });
                        }else{
                            this.props.modal.closeModal();
                        }
                    }}>{this.props.negativeLabel||'Cancel'}</Button>
                    <Button variant="primary" onClick={()=>{
                        if(this.props.responseHandler){
                            this.props.responseHandler(true,()=>{
                                this.props.modal.closeModal();
                            });
                        }else{
                            this.props.modal.closeModal();
                        }
                    }}>{this.props.positiveLabel||'Submit'}</Button>
                </Modal.Footer>
            </div>
        )
    }
}
