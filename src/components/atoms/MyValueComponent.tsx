import React from 'react'

export default function MyValueComponent({values}:{
    values:{
        singular:string,
        plural?:string,
        value:number,
        variant?:number
    }[]
}) {
        
        if(values.length === 0)
            return <span></span>;

        let valueComponent = values[0];

        for (let i = 1; i < values.length && valueComponent.value <= 0; i++) {
            valueComponent = values[i];
        }

        const style={color:'#fafafa',backgroundColor:'#32C809',border:'2px solid #32C809'};

        switch(valueComponent.variant){
            case 0: 
                style.color = '#444';
                style.backgroundColor = 'transparent';
                style.border = '2px solid #ddd';
                break;
            case 0.5: 
                style.color = '#32C809';
                style.backgroundColor = 'transparent';
                style.border = '2px solid #32C809';
                break;
            case 1: 
                style.color = '#fafafa';
                style.backgroundColor = '#32C809';
                style.border = '2px solid '+style.backgroundColor;
                break;
            case -1: 
                style.color = '#fafafa';
                style.backgroundColor = '#F50300';
                style.border = '2px solid '+style.backgroundColor;
                break;
        }

        let name = valueComponent.singular;

        if(valueComponent.value !== 1){
            if(valueComponent.plural){
                name = valueComponent.plural;
            }else{
                name = valueComponent.singular+'s';
            }
        }

        return (
            <table style={{display:'inline-block',...style,padding:'0px 5px',borderRadius:5,margin:5}}>
                <tr>
                    <td style={{minWidth:65,fontSize:20}} align='center'>{valueComponent.value}</td>
                </tr>
                <tr>
                    <td style={{minWidth:65,fontSize:15}} align='center'>{name}</td>
                </tr>
            </table>
        )
}
