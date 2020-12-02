import React, { Component } from 'react'
import ReactQuillEditor from 'react-quill';
import Quill from 'quill';
import * as QuillTypes from 'quill';
import MagicUrl from 'quill-magic-url';
import MyModal from '../../molecules/modal/MyModal';
import { config } from './Types';
import { Form } from 'react-bootstrap';

export default class MyRichTextEditor extends Component<config> {

    quill:ReactQuillEditor;

    imageLinkModal:MyModal;

    lastSelectionRange:QuillTypes.RangeStatic;

    insertImageLink(link){
        console.log(this.quill,this.imageLinkModal,link);

        if(!link)
            return;

        this.quill.getEditor().insertEmbed(this.lastSelectionRange.index, 'image', link); 
        console.log(this.quill.getEditor().getContents(this.lastSelectionRange.index));
    }

    render() {

        Quill.register('modules/magicUrl', MagicUrl);
        
        return (
            <div>
                <Form.Group controlId={this.props.id}>
                    <Form.Label>{this.props.label}</Form.Label>
                    <ReactQuillEditor 
                        ref={(el)=>{
                            this.quill = el; console.log(this.quill)
                        }} 
                        theme="snow" 
                        defaultValue={this.props.defaultValue||''}
                        onChange={(content:string,delta:QuillTypes.Delta,source:QuillTypes.Sources)=>{
                            //console.log(content,delta,source);
                            this.props.valueChanged(this.props.id,content);
                        }} 
                        modules={{
                            magicUrl: true,
                            toolbar: {
                                container: [
                                    ['bold', 'italic', 'underline', 'strike'],       
                                    ['clean'],                                 
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
                                    ['link'],      
                                    ['image'] //add image here
                                ],
                                handlers: {
                                    image: (a,b)=>{
                                        this.lastSelectionRange = this.quill.getEditor().getSelection();
                                        this.imageLinkModal.openModal();
                                    }
                                }
                            }
                        }}
                    />

                    <Form.Text className="text-muted">{this.props.description}</Form.Text>
                </Form.Group>
                

                <MyModal ref={(el)=>{this.imageLinkModal=el;}} type='prompt' modalProps={{
                    title:'Image Upload',
                    label:'Image Link',
                    description:'Please enter the Image link here.',
                    defaultValue:'',
                    responseHandler:(value)=>{
                        this.insertImageLink(value);
                    }
                }}/>
            </div>
            )
        }
    }
    