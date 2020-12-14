import React, { Component } from 'react'
import MyIcon from '../MyIcon';
import { Link } from 'react-router-dom';
import { ITag, Tag } from '../../../rest/data/posts';

export default function MyChip({ tag, onDelete }: {
    tag: ITag,
    onDelete?: Function
}) {
    console.log('MyChip');

    const tds = [<td {...{ valign: 'middle' }} style={{ paddingRight: 5 }}>{tag.tag}</td>];

    if (onDelete) {
        tds.push(
            <td {...{ valign: 'middle' }} id={tag.tag}
                onClick={(event) => {
                    console.log('tag', 'delete', tag.tag);
                    onDelete(tag.tag);
                }}>
                <MyIcon type='close' />
            </td>
        );
    }

    if (!isNaN(tag.count)) {
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
                }}>{tag.count}</p>
            </td>
        );
    }

    console.log(tds)

    let extras: any = {};

    if (tag._id) {
        extras.to = `/tag/${tag._id}`;
    } else {
        extras.to = "#";
    }

    return (
        <Link onClick={(event) => {
            event.stopPropagation();
        }} {...{ ...extras }} >
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
