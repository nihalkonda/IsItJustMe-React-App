import { REST } from 'nk-rest-js-library';
import React, { Component } from 'react'
import { Post, Comment, Tag, IPost, IComment, ITag } from '../../rest/data/posts';
import ItemList from '../organisms/ItemList';
import * as NkReactLibrary from 'nk-react-library';

export default class SearchResults extends Component<{
    itemType: string,
    item: Post | Comment | Tag,
    quickFilters?: { label: string, filter: any }[],
    callback?: any,
    [key: string]: any
}> {
    state = {
        loaded: 0
    };

    oldFilterLabel;

    searchRestObject: REST.SearchRESTObject<IPost | IComment | ITag>;

    getSearchRestObject(itemType: string) {
        switch (itemType) {
            case 'post': return new REST.SearchRESTObject<IPost>(this.props.item as Post);
            case 'comment': return new REST.SearchRESTObject<IComment>(this.props.item as Comment);
            default: return new REST.SearchRESTObject<ITag>(this.props.item as Tag);
        }
    }

    rerunFilter() {
        let label = this.oldFilterLabel || this.props.quickFilters[0].label;
        this.applyFilter((this.props.quickFilters.filter(qf => qf.label === label))[0].filter, label);
    }

    applyFilter(value, label) {
        //alert(value);
        if (!this.searchRestObject)
            this.searchRestObject = this.getSearchRestObject(this.props.itemType);
        if (!value)
            return false;
        this.searchRestObject.request.query = value.query;
        this.searchRestObject.request.sort = value.sort;
        this.searchRestObject.request.pageNum = 1;
        this.oldFilterLabel = label;
        this.performSearch();
        return true;
    }

    performSearch() {
        REST.SafePromise(this.searchRestObject.search()).then((result) => {
            console.log(this, result);
            this.setState({ loaded: new Date().getTime() });
        }).catch(() => {

        })
    }

    reload() {
        this.searchRestObject = this.getSearchRestObject(this.props.itemType);
        this.searchRestObject.request.pageSize = 5;
        this.searchRestObject.request.sort = {
            "lastModifiedAt": -1
        };
        this.searchRestObject.request.query = {
            "isDeleted": false
        }
        this.performSearch()
    }

    componentDidMount() {
        this.reload();
    }

    componentWillReceiveProps() {
        console.log('SearchResults', 'componentWillReceiveProps', this.props);
        this.reload();
    }

    render() {
        if (!this.state.loaded)
            return <div></div>;

        let items: Post[] | Comment[] | Tag[] = [];

        switch (this.props.itemType) {
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

        if (this.searchRestObject.response.resultSize > 0) {
            let base = ((this.searchRestObject.response.pageNum - 1) * this.searchRestObject.response.pageSize);
            title = `Displaying ${base + 1} to ${base + this.searchRestObject.response.resultSize} of ${this.searchRestObject.response.resultTotalSize} results`;
        }

        // const basicGroups = (value) => {
        //     let query = {};
        //     switch(value){
        //         case 1:
        //             query["context"] = "resolve";
        //             break;
        //         case 2:
        //             query["context"] = "update";
        //     }
        //     this.searchRestObject.request.sort={
        //         "lastModifiedAt":-1
        //     };
        //     this.searchRestObject.request.query={
        //         "isDeleted":false,
        //         ...query
        //     }
        //     this.performSearch()
        // }

        return (
            <div>

                {/* <Nav variant="tabs" defaultActiveKey="0" onSelect={(eventKey)=>{
                    console.log(eventKey);
                    basicGroups(parseInt(eventKey));
                }}>
                    {
                        [{label:'Latest First',value:0},{label:'Resolved Only',value:1},{label:'Updates Only',value:2}].map((e)=>(<Nav.Item>
                            <Nav.Link eventKey={e.value} >{e.label}</Nav.Link>
                        </Nav.Item>))
                    }
                </Nav> */}

                {
                    this.props.quickFilters && this.props.quickFilters.length > 1 &&
                    <NkReactLibrary.Components.NkFormElements.NkButtonGroup id='' type='' defaultValue={this.props.quickFilters[0]}
                        valueList={this.props.quickFilters.map(({ label, filter }) => { return { label, value: filter } })}
                        valueChanged={(id, { label, value }) => {
                            console.log({ id, value, label });
                            if (value)
                                this.applyFilter(value, label);
                        }} />
                }
                <h6 style={{ margin: '10px 0px' }}>{title}</h6>
                <ItemList itemType={this.props.itemType} items={items} />
                <NkReactLibrary.Components.Commons.NkPagination totalPageCount={this.searchRestObject.response.pageCount} selectedPage={this.searchRestObject.response.pageNum} pageSelected={(pageNum: number) => {
                    console.log('pageNum', pageNum);
                    this.searchRestObject.request.pageNum = pageNum;
                    this.performSearch();
                }} />
            </div>
        )
    }
}