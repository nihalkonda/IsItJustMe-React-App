import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';

function paginationPattern(selectedPage,totalPages,padding){
    const items = [];
    if(totalPages<=(1+padding+1+padding+1)){
        for(let i=1;i<=totalPages;i++){
            items.push(i);
        }
        return items;
    }
    let leadingEllipsis = selectedPage>padding+2;
    let trailingEllipsis = selectedPage<totalPages-(padding+2);
    
    items.push(1);

    if(leadingEllipsis)
        items.push('e');
    
    for(let i=Math.max(selectedPage-2,2);i<=selectedPage+2;i++){
        if(i>totalPages)
            return items;
        items.push(i);
        if(i===totalPages)
            return items;
    }

    if(trailingEllipsis)
        items.push('e');

    items.push(totalPages);

    return items;
}


export default class MyPagination extends Component<{
    totalPageCount:number,
    selectedPage:number,
    pageSelected:Function
}> {

    
    render() {
        console.log(this.props);
        if(this.props.totalPageCount === 0)
            return <div></div>;

        const items = paginationPattern(this.props.selectedPage,this.props.totalPageCount,1);
        const ele = [];
        for (let i = 0; i < items.length; i++) {
            if(items[i]==='e'){
                ele[i] = <Pagination.Ellipsis disabled/>
            }else{
                ele[i] = (
                    <Pagination.Item key={items[i]} active={items[i] === this.props.selectedPage} data-page-value={items[i]} onClick={()=>{
                        console.log('MyPagination','itemClicked',items[i]);
                        this.props.pageSelected(items[i]);
                    }}>
                        {items[i]}
                    </Pagination.Item>
                );
            }
        }

        return (
            <div>
                <Pagination style={{display:"inline-flex"}}>
                    <Pagination.First data-page-value={1} onClick={()=>{
                        console.log('MyPagination','itemClicked',1);
                        this.props.pageSelected(1);
                    }}/>
                    <Pagination.Prev data-page-value={(this.props.selectedPage-1)} disabled={this.props.selectedPage===1} onClick={()=>{
                        console.log('MyPagination','itemClicked',this.props.selectedPage-1);
                        this.props.pageSelected(this.props.selectedPage-1);
                    }}/>
                    {ele}
                    <Pagination.Next data-page-value={(this.props.selectedPage+1)} disabled={this.props.selectedPage===this.props.totalPageCount} onClick={()=>{
                        console.log('MyPagination','itemClicked',this.props.selectedPage+1);
                        this.props.pageSelected(this.props.selectedPage+1);
                    }}/>
                    <Pagination.Last  data-page-value={this.props.totalPageCount} onClick={()=>{
                        console.log('MyPagination','itemClicked',this.props.totalPageCount);
                        this.props.pageSelected(this.props.totalPageCount);
                    }}/>
                </Pagination>
            </div>
        )
    }
}
