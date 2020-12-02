const DOMAIN = 'http://localhost:5000';

const BASE_PATH = DOMAIN+"/api/v1";

const API = {
    AUTH:{
        SIGN_UP:BASE_PATH+'/auth/sign_up',
        SIGN_IN:BASE_PATH+'/auth/sign_in',
        ME:BASE_PATH+'/auth/me',
        ACCESS_TOKEN:BASE_PATH+'/auth/access_token',
        SEND_CONFIRMATION_TOKEN:BASE_PATH+'/auth/send_confirmation_token',
        CONFIRMATION_TOKEN:BASE_PATH+'/auth/confirmation_token',
        SIGN_OUT:BASE_PATH+'/auth/sign_out',
        SIGN_OUT_ALL:BASE_PATH+'/auth/sign_out_all',
    },
    USER:BASE_PATH+'/user',
    POST:BASE_PATH+'/post',
    COMMENT:function():string{
        return BASE_PATH+'/post/'+this.data.postId+'/comment';
    },
    OPINION:function():string{
        if(this.data.commentId && this.data.commentId!=='none'){
            return BASE_PATH+'/post/'+this.data.postId+'/comment/'+this.data.commentId+'/opinion';
        }else{
            return BASE_PATH+'/post/'+this.data.postId+'/opinion';
        }
    },
    TAG:BASE_PATH+'/tag'
};

export {
    API
}