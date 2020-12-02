import React, { Component } from 'react'
import { Tag } from '../../../rest/data/posts';

type TagProps = {
    tag: Tag
}

export default class TagPreview extends Component<TagProps> {
    render() {
        const tag:Tag = this.props.tag;
        return (
            <div>
                <table >
                    <thead>
                        <tr>
                            <th>
                                {tag.data.tag}
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
