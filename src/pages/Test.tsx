import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import MyImage from '../components/atoms/MyImage';
import * as Invoker from '../utils/factory/invoker';
import MyRichTextEditor from '../components/atoms/form/MyRichTextEditor';
import MyModal from '../components/molecules/modal/MyModal';
import TagInput from '../components/atoms/form/TagInput';
import MyButtonGroup from '../components/atoms/form/MyButtonGroup';


export default class Test extends Component {

    promptModal: MyModal;

    render() {

        return (
            <div>
                <Button onClick={() => {
                    Invoker.createToast('Sample Title', 'Sample Body! \n ' + new Date());
                }}>Create Toast</Button>
                <MyImage src="https://i.insider.com/5d30a3ec36e03c213a2b2eb6?width=1136&format=jpeg" circle={true} border={true} />


                <MyRichTextEditor id='sample' type='rich-text' />

                <MyModal
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
                />
                <br />
                <Button onClick={() => {
                    this.promptModal.openModal();
                }}>
                    Open Confirm
                </Button>
                <br />
                <br />
                <TagInput id='tags' type='tags' defaultValue={['apple', 'ball']} valueChanged={(id, value) => {
                    console.log('id', id, 'value', value);
                }} />


                <MyButtonGroup valueChanged={(value)=>{
                    console.log(value);
                }} id='id' type='' valueList={[
                    {value:0,label:'Apple'},
                    {value:1,label:'Ball'},
                    {value:2,label:'Cat'},
                ]}/>
            </div>
        )
    }
}
