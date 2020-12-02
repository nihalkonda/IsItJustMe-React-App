import React, { Component } from 'react'

export default class MyImage extends Component<{
    src:string,
    alt?:string,
    height?:number,
    width?:number,
    circle?:boolean,
    border?:boolean,
    margin?:number
}> {

    state = {
        error:false
    }

    render() {
        const style = {
            height:200,
            width:200,
            borderRadius:'0%',
            border:'',
            boxShadow:'',
            'object-fit' : 'contain',
            backgroundColor:'white',
            margin:5
        };
        if(this.props.height!==undefined)
            style.height = this.props.height;
        if(this.props.width!==undefined)
            style.width = this.props.width;
        if(this.props.circle){
            style.borderRadius='50%';
            style['object-fit'] = 'cover';
        }
        if(this.props.border){
            style.border = (style.width/40)+'px white solid';
            style.boxShadow = '0 0 5px #444';
        }
        if(this.props.margin){
            style.margin = this.props.margin;
        }
        let src = this.props.src;
        if(this.state.error){
            src = 'https://i.pinimg.com/originals/eb/4f/f5/eb4ff53de5c19dddcc25704418ebd9aa.png';
        }

        return (
            <img style={style} src={src} alt={this.props.alt||'Basic Image'} onError={(event)=>{
                this.setState({error:true});
            }}/>
        )
    }
}
