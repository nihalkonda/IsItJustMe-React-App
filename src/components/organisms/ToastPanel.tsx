import React, { Component } from 'react'
import MyToast from '../molecules/MyToast';
import factory from '../../utils/factory';
import binderKey from '../../utils/factory/binder.key';
export default class ToastPanel extends Component{

    state={
        toastList:[],
        loaded:0,
        scrollY:0
    }

    addToast = (title:string,body:string) => {

        let toastList = this.state.toastList;

        const ctime = new Date().getTime();

        toastList = toastList.filter((t)=>t.disappearIn>ctime);

        toastList.push({
            title,body,disappearIn:ctime+5000
        })

        this.setState({toastList,loaded:new Date().getTime()});
        
        console.log('ToastPanel','addToast',this.state.toastList);

    }


    componentDidMount(){
        factory.bindFunction(binderKey.CREATE_TOAST,this.addToast);
        window.addEventListener('scroll',()=>{
            this.setState({scrollY:window.scrollY});
        })
    }

    render() {
        return (
            <div key={this.state.loaded} style={{
                position:'absolute',
                top:15+this.state.scrollY,
                right:10
            }}>
                {this.state.toastList.map((toast)=><MyToast title={toast.title||''} body={toast.body||''} disappearIn={toast.disappearIn-new Date().getTime()}/>)}
            </div>
        )
    }
}
