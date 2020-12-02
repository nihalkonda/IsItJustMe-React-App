import React,{Component} from 'react'
import { Button, ButtonGroup, Form, Nav } from 'react-bootstrap';
import { Post, Comment, Tag, IPost, IComment, ITag } from '../../rest/data/posts';
import safePromise from '../../rest/rest/safe.promise';
import SearchRESTObject from '../../rest/rest/search.rest.object';
import MyPagination from '../atoms/MyPagination'
import ItemList from '../organisms/ItemList'

export default class SearchResults extends Component<{
    itemType:string,
    item:Post|Comment|Tag,
    [key:string]:any
}> {
    state = {
        loaded:0
    };

    searchRestObject:SearchRESTObject<IPost|IComment|ITag>;

    getSearchRestObject(itemType:string){
        switch(itemType){
            case 'post': return new SearchRESTObject<IPost>(this.props.item as Post);
            case 'comment': return new SearchRESTObject<IComment>(this.props.item as Comment);
            default: return new SearchRESTObject<ITag>(this.props.item as Tag);
        }
    }

    performSearch(){
        safePromise(this.searchRestObject.search()).then((result)=>{
            console.log(this,result);
            this.setState({loaded:new Date().getTime()});
        }).catch(()=>{

        })
    }

    reload(){
        this.searchRestObject = this.getSearchRestObject(this.props.itemType);
        this.searchRestObject.request.pageSize = 5;
        this.searchRestObject.request.sort={
            "lastModifiedAt":-1
        };
        this.searchRestObject.request.query={
            "isDeleted":false
        }
        this.performSearch()
    }

    componentDidMount(){
        this.reload();
    }

    componentWillReceiveProps(){
        console.log('SearchResults','componentWillReceiveProps',this.props);
        this.reload();
    }

    render() {
        if(!this.state.loaded)
            return <div></div>;

        let items:Post[]|Comment[]|Tag[] = [];

        switch(this.props.itemType){
            case 'post':
                items = this.searchRestObject.response.result as Post[];
                break;
            case 'comment':
                items = this.searchRestObject.response.result as Comment[];
                break;
            default:
                items = this.searchRestObject.response.result as Tag[];
        }

        let title = `No ${this.props.itemType}s found.`;

        if(this.searchRestObject.response.resultSize > 0){
            let base = ((this.searchRestObject.response.pageNum - 1) * this.searchRestObject.response.pageSize);
            title = `Displaying ${base+1} to ${base + this.searchRestObject.response.resultSize} of ${this.searchRestObject.response.resultTotalSize} results`;
        }

        const basicGroups = (value) => {
            let query = {};
            switch(value){
                case 1:
                    query["context"] = "resolve";
                    break;
                case 2:
                    query["context"] = "update";
            }
            this.searchRestObject.request.sort={
                "lastModifiedAt":-1
            };
            this.searchRestObject.request.query={
                "isDeleted":false,
                ...query
            }
            this.performSearch()
        }

        return (
            <div>
                
                <Nav variant="tabs" defaultActiveKey="0" onSelect={(eventKey)=>{
                    console.log(eventKey);
                    basicGroups(parseInt(eventKey));
                }}>
                    {
                        [{label:'Latest First',value:0},{label:'Resolved Only',value:1},{label:'Updates Only',value:2}].map((e)=>(<Nav.Item>
                            <Nav.Link eventKey={e.value} >{e.label}</Nav.Link>
                        </Nav.Item>))
                    }
                </Nav>
                <h6 style={{margin:'10px 0px'}}>{title}</h6>
                <ItemList itemType={this.props.itemType} items={items} />
                <MyPagination totalPageCount={this.searchRestObject.response.pageCount} selectedPage={this.searchRestObject.response.pageNum} pageSelected={(pageNum:number)=>{
                    console.log('pageNum',pageNum);
                    this.searchRestObject.request.pageNum=pageNum;
                    this.performSearch();
                }}/>
            </div>
        )
    }
}
