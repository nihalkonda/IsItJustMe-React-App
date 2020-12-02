import React, { Component } from 'react'

export default class MyRichTextContainer extends Component<{html:string}> {
    render() {
        return <div className="quill ql-editor ql-container" dangerouslySetInnerHTML={{__html:this.props.html}}></div> 
    }
}
