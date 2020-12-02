import factory from ".";
import BinderKey from "./binder.key";

const createToast = (title:string,body:string) => { 
    factory.boundFunction(BinderKey.CREATE_TOAST)(title,body);
}

const redirectToURL = (url:string) => {
    factory.boundFunction(BinderKey.REDIRECT_URL)(url);
}

export {
    createToast,
    redirectToURL
}

