import React from 'react'
import { Button } from 'react-bootstrap';
//import * as Invoker from '../utils/factory/invoker';
import TagInput from '../components/atoms/tag/MyTagInput';
import { Utils } from 'nk-react-library';
import * as NkReactLibrary from 'nk-react-library';


export default function Test() {
    return (
        <div>
            <Button onClick={() => {
                Utils.NkReactUtils.ToastPanel.addToast('Sample Title', 'Sample Body! \n ' + new Date());
            }}>Create Toast</Button>
            <NkReactLibrary.Components.Commons.NkImage src="https://i.insider.com/5d30a3ec36e03c213a2b2eb6?width=1136&format=jpeg" circle={true} border={true} />


            {/* <MyModal
                    ref={(el) => {
                        this.promptModal = el;
                    }}
                    type='confirm'
                    modalProps={{
                        title: 'Name',
                        label: 'Full Name',
                        description: 'Please tell us your name',
                        negativeLabel: 'Nope',
                        positiveLabel: 'Here you go!',
                        responseHandler: (value) => {
                            console.log('prompt', 'value', value);
                        },
                        closedHandler: (responseSent) => {
                            console.log('confirm closed', 'responseSent', responseSent)
                        }
                    }}
                /> */}
            <br />
            <Button onClick={() => {
                //this.promptModal.openModal();
                NkReactLibrary.Utils.NkReactUtils.Modal.confirm({
                    title: 'Sample Title',
                    positiveWarning: true
                }).then((result) => {
                    console.log(result);
                })
            }}>
                Open Confirm
                </Button>
            <br />
            <br />
            <TagInput id='tags' type='tags' defaultValue={['apple', 'ball']} valueChanged={(id, value) => {
                console.log('id', id, 'value', value);
            }} />


            <NkReactLibrary.Components.NkFormElements.NkButtonGroup valueChanged={(value) => {
                console.log(value);
            }} id='id' type='' valueList={[
                { value: 0, label: 'Apple' },
                { value: 1, label: 'Ball' },
                { value: 2, label: 'Cat' },
            ]} />{' '}
            <Button onClick={() => {
                console.log(NkReactLibrary.Utils.NkReactUtils);
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/about_us');

            }}>Link</Button>{' '}
            <Button onClick={() => {
                NkReactLibrary.Utils.NkStateManagerUtils.setStateValue('language', 'english');
            }}>Switch to English</Button>{' '}
            <Button onClick={() => {
                NkReactLibrary.Utils.NkStateManagerUtils.setStateValue('language', 'spanish');
            }}>Switch to Spanish</Button>
        </div>
    );
}
