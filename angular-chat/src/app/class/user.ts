export class User {

    displayName: string|null;
    email: string|null;
    photoURL: string|null;
    uid: string|null;
    initial: string|null;

    constructor(user: User | firebase.default.User){
        this.uid = user.uid;
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;
        // 最初の一文字を受け取る
        if(user.displayName){
            this.initial = user.displayName.slice(0, 1);
        }
        
    }    
}
