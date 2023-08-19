import { User } from './user';

export class Comment {
    date: number;
    user: User;
    message: string;
    // 省略できるように?をつける
    key?: string;
    isEdit: boolean = false;

    constructor(value: any){
        this.date = Date.now() | value.date;
        this.user = value.user;
        this.message = value.message;
        if(value.key){
            this.key = value.key;
        }
    }
}
