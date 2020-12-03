interface config {
    id:string,
    label?:string,
    type:string,
    placeholder?:string,
    description?:string,
    inline?:boolean,
    isTextarea?:boolean,
    required?:boolean,
    defaultValue?:any,
    valueList?:any[]
    valueChanged?:Function,
    liveSuggestions?:Function,
    formButtonClicked?:Function
}

export type{
    config
}