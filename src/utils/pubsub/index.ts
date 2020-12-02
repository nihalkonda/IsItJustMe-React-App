import * as Publisher from "./publisher";
import Subscriber from "./subscriber";
import Topic from './topic';

class Organizer{

    subscribers:{[key:string]:Subscriber[]};

    constructor(){
        this.subscribers = {};
    }

    subscribe(topic:string,subscriber:Subscriber){
        if(!this.subscribers[topic]){
            this.subscribers[topic] = [];
        }
        this.subscribers[topic].push(subscriber);
    }

    publishMessage(topic:string,message:any){
        console.log('PubSub','publishMessage','topic',topic,'message',message);
        return new Promise((resolve,reject)=>{
            try {
                if(this.subscribers[topic]){
                    this.subscribers[topic].forEach((subscriber:Subscriber)=>{
                        subscriber.processMessage(topic,message);
                    })
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

}

const PubSub = new Organizer();

export{
    PubSub,
    Publisher,
    Topic
}
export type{
    Subscriber
}