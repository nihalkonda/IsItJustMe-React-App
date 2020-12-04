import React, { Component } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { config } from './Types';

export default class MyButtonGroup extends Component<config> {
    state = {
        selectedButton: null,
        loaded:0
    };

    componentDidMount() {
        this.setState({ selectedButton: this.props.defaultValue||{label:'',value:null},loaded:new Date().getTime() });
        if(this.props.defaultValue)
            this.props.valueChanged(this.props.defaultValue.value);
    }

    render() {

        if(!this.state.loaded)
            return <div></div>;

        return (
            <ButtonGroup style={{
                border:'1px solid #007bff',
                borderRadius:'0.35rem'
            }}>
                {
                    this.props.valueList.map(({ label, value }) => <Button onClick={() => {
                        if (this.state.selectedButton.label !== label)
                            this.setState({
                                selectedButton: {label,value}
                            }, () => {
                                this.props.valueChanged(value,label)
                            })
                    }} variant={label === this.state.selectedButton.label ? "primary" : "outline-primary"} 
                    style={{
                        borderColor:'transparent'
                    }}>{label}</Button>)
                }
            </ButtonGroup>
        )
    }
}
