import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import MyChip from '../MyChip';
import { config } from './Types';

export default class TagInput extends Component<config> {

    state = {
        tags: [],
        options: [],
        value: ''
    };

    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ tags: this.props.defaultValue });
        }
    }

    addTag() {
        let value = this.state.value.trim().toLowerCase().replace(/  +/g, ' ');
        if (this.state.tags.indexOf(value) === -1) {
            this.setState({
                tags: [...this.state.tags, value],
                value: ''
            }, () => {
                this.props.valueChanged(this.props.id, this.state.tags)
            });
        } else {
            this.setState({
                value: ''
            });
        }
    }

    deleteTag(tag: string) {
        console.log('tag', 'delete', tag)
        this.setState({
            tags: this.state.tags.filter((t) => t !== tag)
        }, () => {
            this.props.valueChanged(this.props.id, this.state.tags)
        })
    }

    valueChanged() {
        console.log('valueChanged');
        if (!this.state.value) {
            return;
        }
        console.log('valueChanged', this.state.value);
        if (!this.props.liveSuggestions) {
            return;
        }
        console.log('valueChanged', this.state.value, this.props.liveSuggestions);
        this.props.liveSuggestions(this.state.value, (suggestions) => {
            console.log('valueChanged', 'liveSuggestions', suggestions);
            this.setState({ options: suggestions })
        })
    }

    render() {

        return (
            <div>
                <Form.Group>
                    <Form.Label>Tags <small>(Press 'Enter' to add a tag.)</small></Form.Label>
                    <Form.Control
                        style={{ maxWidth: 600 }}
                        type={this.props.type}
                        list={this.props.id}
                        defaultValue={this.state.value || ''}
                        value={this.state.value || ''}
                        onChange={(event) => {
                            this.setState({ value: event.target.value }, () => {
                                this.valueChanged();
                            });
                        }}
                        onKeyDown={(event) => {
                            if (event.keyCode === 13) {
                                event.stopPropagation();
                                event.preventDefault();
                                this.addTag();
                            }
                        }}
                    />
                    <datalist id={this.props.id}>
                        {
                            this.state.options.map((o) => <option value={o} />)
                        }
                    </datalist>
                </Form.Group>
                <div>
                    {
                        this.state.tags.map((tag) => <MyChip tag={{tag}} onDelete={() => { this.deleteTag(tag) }} />)
                    }
                </div>
            </div>
        )
    }
}
