import React, { Component } from 'react'
import * as NkReactLibrary from 'nk-react-library';
import { Button } from 'react-bootstrap';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
      <div>
        <Main />
        {/* <NkReactLibrary.Components.NkContainer headerComponent={<h1>Happy</h1>}>
          <h2>Birthday</h2>
          <Button onClick={() => { console.log(NkReactLibrary.Utils.NkReactUtils); }}>Logger</Button>{' '}
          <Button onClick={() => {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Sample Title', 'Sample Body' + new Date().getTime());
          }}>Toast</Button>{' '}
          <Button onClick={() => {
            NkReactLibrary.Utils.NkReactUtils.Modal.confirm({
              title: 'Sample Title'
            }).then((result) => {
              console.log('Modal Confirm Result', result);
            }).catch((error) => {
              console.error('Modal Confirm error', error);
            })
          }}>Confirm</Button>{' '}
          <Button onClick={() => {
            NkReactLibrary.Utils.NkReactUtils.Modal.prompt({
              title: 'Sample Title'
            }).then((result) => {
              console.log('Modal Confirm Result', result);
            }).catch((error) => {
              console.error('Modal Confirm error', error);
            })
          }}>Prompt</Button>

          <NkReactLibrary.Components.NkForm
            formConfig={[{
              id: 'body',
              type: 'rich-text'
            }, {
              id: 'submit',
              type: 'submit',
              defaultValue: 'submit'
            }]}
            formSubmit={(response) => {
              console.log(response);
            }}
          />
        </NkReactLibrary.Components.NkContainer> */}
      </div>
    )
  }
}
