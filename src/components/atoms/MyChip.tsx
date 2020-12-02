import React, { Component } from 'react'
import MyIcon from './MyIcon'

export default class MyChpi extends Component<{
    text:string,
    onDelete?:Function
}> {
    render() {

        const tds = [<td {...{valign:'middle'}}>{this.props.text}</td>];

        if(this.props.onDelete){
            tds.push(
                <td style={{display:'inline-flex'}} 
                    {...{valign:'middle'}}
                    onClick={(event)=>{
                        console.log('tag','delete',this.props.text);
                        this.props.onDelete(this.props.text);
                    }}>
                        <MyIcon type='close'/>
                </td>
            );
        }

        return (
            <table style={{
                border:'1px solid',
                borderRadius:10,
                padding:'0px 10px',
                margin:5,
                backgroundColor:'#E5EFFF',
                color:'#4887F6',
                display:'inline-block'
                }}>
                    <tr style={{height:35}}>
                        {tds} 
                    </tr>
            </table>
        )
    }
}
