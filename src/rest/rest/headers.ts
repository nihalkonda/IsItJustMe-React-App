interface Token{
    value:string,
    expiryTime:number
}

class Headers{
    
    data = {
        userId:'',
        accessToken:{
            value:'',
            expiryTime:0
        },
        refreshToken:{
            value:'',
            expiryTime:0
        },
        isConfirmed:false
    };

    isUserLoggedIn(){
        console.log('Headers','isUserLoggedIn',this.data.accessToken.expiryTime);
            return this.data.accessToken.expiryTime>0;
    }

    setUserId(userId:string){
        this.data.userId = userId;
        return this.data.userId;
    }

    getUserId(){
        return this.data.userId;
    }

    getAccessToken(){
        return this.data.accessToken;
    }

    getRefreshToken(){
        return this.data.refreshToken;
    }

    setAccessToken(value:string,expiryTime:number){
        this.data.accessToken = {
            value,
            expiryTime
        };
        return this.getAccessToken();
    }

    setRefreshToken(value:string,expiryTime:number){
        this.data.refreshToken = {
            value,
            expiryTime
        };
        return this.getRefreshToken();
    }
    
    isUserConfirmed(){
        return this.data.isConfirmed;
    }

    setUserConfirmed(isConfirmed:boolean){
        this.data.isConfirmed = isConfirmed;
        return this.data.isConfirmed;
    }

    backupData(){
        window.localStorage.setItem('backup',JSON.stringify(this.data));
    }

    loadData(){
        let data = {
            userId:'',
            accessToken:{
                value:'',
                expiryTime:0
            },refreshToken:{
                value:'',
                expiryTime:0
            },
            isConfirmed:false
        };
        try {
            let temp = JSON.parse(window.localStorage.getItem('backup'));
            console.log('Headers','loadData','temp',temp)
            data.userId = temp.userId||data.userId;
            data.accessToken = temp.accessToken||data.accessToken;
            data.refreshToken = temp.refreshToken||data.refreshToken;
            data.isConfirmed = temp.isConfirmed||data.isConfirmed;
        } catch (error) {
            console.error(error);
        }
        // const {accessToken,refreshToken,isConfirmed} = data;
        // this.setAccessToken(accessToken.value||'',accessToken.expiryTime||0);
        // this.setRefreshToken(refreshToken.value||'',refreshToken.expiryTime||0);
        // this.setUserConfirmed(isConfirmed||false);
        this.data = data;
        // console.log('Headers','loadData','finished',accessToken);
    }

}

export default new Headers();