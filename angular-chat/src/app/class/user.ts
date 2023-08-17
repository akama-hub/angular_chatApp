export class User {

    initial: string;

    constructor(public uid: number, public name: string){
        // 最初の一文字を受け取る
        this.initial = name.slice(0, 1);
    }    
}
