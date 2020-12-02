import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import SimpleInput from '../../atoms/form/SimpleInput'
import {ModalContentProps} from './ModalProps';

export default class PromptModalContent extends Component<ModalContentProps> {

    state = {
        value:''
    };

    render() {
        return (
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SimpleInput 
                        id='value' 
                        type='input' 
                        label={this.props.label} 
                        description={this.props.description} 
                        defaultValue={this.props.defaultValue}
                        valueChanged={(id,value)=>{
                            this.setState({value});
                        }}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        if(this.props.responseHandler){
                            this.props.responseHandler(null,()=>{
                                this.props.modal.closeModal();
                            });
                        }else{
                            this.props.modal.closeModal();
                        }
                    }}>{this.props.negativeLabel||'Cancel'}</Button>
                    <Button variant="primary" onClick={()=>{
                        if(this.props.responseHandler){
                            this.props.responseHandler(this.state.value,()=>{
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
