import React, { Component } from 'react'
import MyIcon from './MyIcon';
import {Link} from 'react-router-dom';
import { ITag } from '../../rest/data/posts';

export default class MyChip extends Component<{
    tag:ITag,
    onDelete?: Function
}> {
    render() {
        console.log('MyChip', this.props);

        const tds = [<td {...{ valign: 'middle' }} style={{ paddingRight: 5 }}>{this.props.tag.tag}</td>];

        if (this.props.onDelete) {
            tds.push(
                <td {...{ valign: 'middle' }}
                    onClick={(event) => {
                        console.log('tag', 'delete', this.props.tag.tag);
                        this.props.onDelete(this.props.tag.tag);
                    }}>
                    <MyIcon type='close' />
                </td>
            );
        }

        if (!isNaN(this.props.tag.count)) {
            tds.push(
                <td {...{ valign: 'middle' }} >
                    <p style={{
                        backgroundColor: '#4887F6',
                        borderRadius: 10,
                        color: '#fff',
                        padding: '0px 5px',
                        display: 'inherit',
                        minWidth: 30,
                        textAlign: 'center'
                    }}>{this.props.tag.count}</p>
                </td>
            );
        }

        console.log(tds)

        return (
            <Link onClick={(event) => {
                event.stopPropagation();
            }} to={`/tag/${this.props.tag._id}`}>
                <table style={{
                    border: '1px solid',
                    borderRadius: 10,
                    padding: '0px 10px',
                    margin: 5,
                    backgroundColor: '#E5EFFF',
                    color: '#4887F6',
                    display: 'inline-block'
                }} >
                    <tr style={{ height: 35 }}>
                        {tds}
                    </tr>
                </table>

            </Link>
        )
    }
}
