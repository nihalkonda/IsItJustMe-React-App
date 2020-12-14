import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as NkReactLibrary from 'nk-react-library';

export default class UserProfilePreview extends Component<{
    firstName: string,
    lastName: string,
    email: string,
    userId: string,
    displayPicture: string,
    small?: boolean,
    [key: string]: any
}> {
    render() {
        if (this.props.small) {
            return <Link to={'/user/' + this.props.userId} onClick={(event) => { event.stopPropagation(); }}>{`${this.props.firstName} ${this.props.lastName}`}</Link>
        }
        return (
            <div>
                <table style={{
                    border: '2px solid #007bff',
                    borderRadius: '60px 10px 10px 60px',
                    borderCollapse: 'initial',
                    overflow: 'hidden',
                    margin: 10
                }} cellPadding={0} cellSpacing={0} onClick={(event) => {
                    event.stopPropagation();
                    NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/user/' + this.props.userId);
                }}>
                    <tr>
                        <td style={{ backgroundColor: '#007bff' }}>
                            <NkReactLibrary.Components.Commons.NkImage src={this.props.displayPicture} circle={true} border={true} height={50} width={50} margin={5} />
                        </td>
                        <td style={{ padding: '0px 5px' }}>
                            <small>
                                {`${this.props.firstName} ${this.props.lastName}`}
                                <br />
                                <i>{this.props.email}</i>
                            </small>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}
