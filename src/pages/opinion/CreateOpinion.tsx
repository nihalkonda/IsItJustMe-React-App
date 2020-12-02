import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import {config} from '../../components/atoms/form/Types';
import { Publisher } from '../../utils/pubsub';
import * as Invoker from '../../utils/factory/invoker';
import { IOpinion, Opinion } from '../../rest/data/posts';
import SearchRESTObject from '../../rest/rest/search.rest.object';
import headers from '../../rest/rest/headers';
import { Button } from 'react-bootstrap';
import safePromise from '../../rest/rest/safe.promise';
import MyContainer from '../../components/atoms/MyContainer';

export default class CreateOpinion extends Component<{
    postId:string,
    commentId?:string,
    postAuthorView:boolean
}> {

    state = {
        loaded:0
    };

    opinion:Opinion;
    searchRestObject:SearchRESTObject<IOpinion>;

    loadOpinions(){
        safePromise(this.searchRestObject.search()).then(()=>{
            this.setState({loaded:new Date().getTime()})
        }).catch(()=>{

        })
    }

    componentDidMount(){
        this.opinion = new Opinion();
        this.opinion.data.postId = this.props.postId;
        if(this.props.commentId){
            this.opinion.data.commentId = this.props.commentId;
        }
        this.searchRestObject = new SearchRESTObject(this.opinion);
        this.searchRestObject.request.query={
            "author":headers.getUserId()
        };
        this.loadOpinions();
    }

    createOpinion(opinionType:string){
        this.opinion.data.body='';
        this.opinion.data._id='';
        this.opinion.data.opinionType = opinionType;
        safePromise(this.opinion.create()).then(()=>{
            Invoker.createToast('Opinion Created','');
            Publisher.opinionCreated();
            this.loadOpinions();
        }).catch(()=>{
            Invoker.createToast('Opinion Creation Failed','');
        })
    }

    deleteOpinion(_id:string){
        this.opinion.data._id=_id;
        safePromise(this.opinion.delete()).then(()=>{
            Invoker.createToast('Opinion Deleted','');
            Publisher.opinionCreated();
            this.loadOpinions();
        }).catch(()=>{
            Invoker.createToast('Opinion Deletion Failed','');
        })
    }

    render() {
        if(!this.state.loaded)
            return <span></span>

        let opinions = this.searchRestObject.response.result;

        let buttons = {
            'follow':{
                label:'Follow',
                neglabel:'Un-Follow',
                active:true,
                _id:''
            },
            'upvote':{
                label:'Up Vote', 
                neglabel:'Un-Up Vote',
                active:true,
                _id:''
            },
            'downvote':{
                label:'Down Vote',
                neglabel:'Un-Down Vote',
                active:true,
                _id:''
            },
            'spamreport':{
                label:'Spam Report',
                neglabel:'Un-Spam Report',
                active:true,
                _id:''
            }
        };

        if(this.props.commentId){
            if(this.props.postAuthorView){
                buttons['follow']['label'] = "Mark as Resolved";
                buttons['follow']['neglabel'] = "Un-Mark as Resolved";
            }else{
                delete buttons['follow'];
            }
        }

        console.log('opinions',opinions);

        opinions.forEach((_opinion:any)=>{
            console.log(_opinion);
            buttons[_opinion.data.opinionType].active=false;
            buttons[_opinion.data.opinionType]._id = _opinion.data._id;
        })

        return (
        <div>
            <br/>
            {
                Object.keys(buttons).map((buttonType:string)=>{
                    return (
                        //@ts-ignore
                        <MyContainer>
                            <Button 
                                onClick={()=>{
                                    if(buttons[buttonType].active)
                                        this.createOpinion(buttonType);
                                    else
                                        this.deleteOpinion(buttons[buttonType]._id);
                                }}>
                                    {buttons[buttonType].active?buttons[buttonType].label:buttons[buttonType].neglabel}
                            </Button>{'   '}
                        </MyContainer>
                    )
                })
            }
        </div>);
    }
}
