import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import ConfirmationModalContent from './ConfirmationModalContent';
import {ModalProps} from './ModalProps';
import PromptModalContent from './PromptModalContent';

export default class MyModal extends Component<{
    type?:string,
    modalProps?:ModalProps
}> {
    state = {
        show:false,
        responseSent:false
    };

    openModal = () => {
        this.setState({show:true,responseSent:false});
    };

    closeModal = () => {
        this.setState({show:false});
        if(this.props.modalProps.closedHandler)
            this.props.modalProps.closedHandler(this.state.responseSent);
    };


    render() {

        let children = this.props.children;

        const responseHandler = (value,callback) => {
            console.log('MyModal','responseHandler');
            this.setState({responseSent:true},()=>{
                this.props.modalProps.responseHandler(value);
                callback();
            })
        };

        switch(this.props.type){
            case 'prompt':
                children = <PromptModalContent {...this.props.modalProps} responseHandler={responseHandler} modal={this}/>
                break;
            case 'confirm':
                children = <ConfirmationModalContent {...this.props.modalProps} responseHandler={responseHandler} modal={this}/>
                break;
        }

        return (
            <Modal show={this.state.show} onHide={()=>{console.log('hidden');this.closeModal()}}>
                {children}
            </Modal>
        )
    }
}
