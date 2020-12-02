import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as Invoker from '../../../utils/factory/invoker';
import MyImage from '../../atoms/MyImage';

export default class UserProfilePreview extends Component<{
    firstName:string,
    lastName:string,
    email:string,
    userId:string,
    displayPicture:string,
    small?:boolean,
    [key:string]:any
}> {
    render() {
        if(this.props.small){
            return <Link to={'/user/'+this.props.userId}>{`${this.props.firstName} ${this.props.lastName}`}</Link>
        }
        return (
            <div>
                <table style={{
                    border:'2px solid #007bff',
                    borderRadius:'60px 10px 10px 60px',
                    borderCollapse:'initial',
                    overflow:'hidden',
                    margin:10
                }} cellPadding={0} cellSpacing={0} onClick={(event)=>{
                    event.stopPropagation();
                    Invoker.redirectToURL('/user/'+this.props.userId);
                }}>
                    <tr>
                        <td style={{backgroundColor:'#007bff'}}>
                            <MyImage src={this.props.displayPicture} circle={true} border={true} height={50} width={50} margin={5}/>
                        </td>
                        <td style={{padding:'0px 5px'}}>
                            <small>
                                {`${this.props.firstName} ${this.props.lastName}`}
                                <br/>
                                <i>{this.props.email}</i>
                            </small>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}
