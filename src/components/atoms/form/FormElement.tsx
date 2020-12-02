import React, { Component } from 'react'
import { config } from './Types';
import SubmitButton from './SubmitButton';
import SimpleInput from './SimpleInput';
import SimpleButton from './SimpleButton';
import TagInput from './TagInput';
import MyRichTextEditor from './MyRichTextEditor';

export default class FormElement extends Component<{
    elementConfig:config
}> {
    render() {
        switch(this.props.elementConfig.type){
            case 'rich-text':
                return <MyRichTextEditor {...this.props.elementConfig}/>;
            case 'button':
                return <SimpleButton {...this.props.elementConfig}/>;
            case 'submit':
                return <SubmitButton {...this.props.elementConfig}/>;
            case 'tag':
                return <TagInput {...this.props.elementConfig}/>;
            default:
                return <SimpleInput {...this.props.elementConfig}/>;
        }
    }
}
