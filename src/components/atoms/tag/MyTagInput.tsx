import React from 'react'
import { Form } from 'react-bootstrap';
import MyChip from './MyTag';
import * as NkReactLibrary from 'nk-react-library';

export default function TagInput({ id, type, defaultValue, valueChanged, label, description, liveSuggestions }: NkReactLibrary.Components.NkFormElements.NkFormElementTypes.config) {

    const [tags, setTags] = React.useState(defaultValue || []);
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        if (tags)
            valueChanged(id, tags);
    }, [tags])

    React.useEffect(() => {
        console.log('valueChanged');
        if (!value) {
            return;
        }
        console.log('valueChanged', value);
        if (!liveSuggestions) {
            return;
        }
        console.log('valueChanged', value, liveSuggestions);
        liveSuggestions(value, (suggestions) => {
            console.log('valueChanged', 'liveSuggestions', suggestions);
            setOptions(suggestions);
        })
    }, [value])

    const addTag = () => {
        let tempValue = value.trim().toLowerCase().replace(/  +/g, ' ');
        setValue('');
        if (tags.indexOf(value) === -1) {
            setTags(prevTags => ([...prevTags, tempValue]))
        }
    };

    const deleteTag = (tag: string) => {
        console.log('tag', 'delete', tag)
        setTags(prevTags => prevTags.filter((t) => t !== tag));
    }

    const list = `${id}-${new Date().getTime()}`;

    return (
        <div>
            <Form.Group>
                <Form.Label>{label || 'Tags'} <small>{description || "(Press 'Enter' to add a tag.)"}</small></Form.Label>
                <Form.Control
                    style={{ maxWidth: 600 }}
                    id={id}
                    list={list}
                    defaultValue={value || ''}
                    value={value || ''}
                    autoComplete="off"
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            event.stopPropagation();
                            event.preventDefault();
                            addTag();
                        }
                    }}
                />
                <datalist id={list}>
                    {
                        options.map((o) => <option value={o} />)
                    }
                </datalist>
            </Form.Group>
            <div>
                {
                    tags.map((tag) => <MyChip tag={{ tag }} onDelete={() => { deleteTag(tag) }} />)
                }
            </div>
        </div>
    )
}