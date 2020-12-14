import React from "react";
import { withRouter } from "react-router-dom";
import * as NkReactLibrary from 'nk-react-library';

export default withRouter((props) => {
    React.useEffect(() => {
        NkReactLibrary.Utils.NkReactUtils.setRedirect({
            redirect: (path: string) => {
                props.history.push(path);
            }
        })
    }, [])
    return <></>
})