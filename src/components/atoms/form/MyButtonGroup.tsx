import React, { Component } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { config } from './Types';

export default class MyButtonGroup extends Component<config> {
    state = {
        selectedButton: null
    };

    componentDidMount() {
        this.setState({ selectedButton: this.props.defaultValue });
    }

    render() {

        return (
            <ButtonGroup style={{
                border:'1px solid #007bff',
                borderRadius:'0.35rem'
            }}>
                {
                    this.props.valueList.map(({ label, value }) => <Button onClick={() => {
                        if (this.state.selectedButton !== value)
                            this.setState({
                                selectedButton: value
                            }, () => {
                                this.props.valueChanged(value)
                            })
                    }} variant={value === this.state.selectedButton ? "primary" : "outline-primary"} 
                    style={{
                        borderColor:'transparent'
                    }}>{label}</Button>)
                }
            </ButtonGroup>
        )
    }
}
