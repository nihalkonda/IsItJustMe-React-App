import { Auth } from "./data/user-management";

async function test1(){
    await Auth.login('nihal+test1@isitjustme.info','strong');
}

test1();