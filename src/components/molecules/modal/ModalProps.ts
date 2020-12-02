import MyModal from './MyModal';

interface ModalProps{
    title?:string,
    label?:string,
    positiveLabel?:string,
    negativeLabel?:string,
    description?:string,
    defaultValue?:any,
    responseHandler?:Function,
    closedHandler?:Function
}

interface ModalContentProps extends ModalProps{
    modal:MyModal
}

export type { ModalProps , ModalContentProps};